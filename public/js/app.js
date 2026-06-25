(function () {
  const TOKEN_KEY = 'sttt_access_token';
  const API_BASE = '';
  let confirmModalState = null;

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  function redirect(path) {
    window.location.assign(path);
  }

  function normalizePath(pathname) {
    if (!pathname || pathname === '/') {
      return '/';
    }

    return pathname.replace(/\/+$/, '');
  }

  function syncSidebarNavigation() {
    const currentPath = normalizePath(window.location.pathname);
    const links = document.querySelectorAll(
      '.sidebar-nav .sidebar-link[href], .sidebar-footer .profile-chip[href]',
    );

    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) {
        return;
      }

      const targetPath = normalizePath(new URL(href, window.location.origin).pathname);
      const isActive =
        targetPath === '/' ? currentPath === '/' : currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
      link.classList.toggle('active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function getErrorMessage(payload, fallback) {
    if (!payload) {
      return fallback;
    }

    if (typeof payload.message === 'string') {
      return payload.message;
    }

    if (Array.isArray(payload.message) && payload.message.length > 0) {
      return payload.message[0];
    }

    return fallback;
  }

  async function request(path, options = {}) {
    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');

    if (!(options.body instanceof FormData) && options.body !== undefined) {
      headers.set('Content-Type', 'application/json');
    }

    const token = getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });

    const text = await response.text();
    let payload = null;

    if (text) {
      try {
        payload = JSON.parse(text);
      } catch (_error) {
        payload = { message: text };
      }
    }

    if (!response.ok) {
      const error = new Error(getErrorMessage(payload, 'Request failed'));
      error.status = response.status;
      error.payload = payload;
      throw error;
    }

    return payload;
  }

  function setupAuthGate() {
    const page = document.body.dataset.page;
    const token = getToken();

    if ((page === 'login' || page === 'register') && token) {
      redirect('/profile');
      return true;
    }

    if (page === 'profile' && !token) {
      redirect('/login');
      return true;
    }

    return false;
  }

  function setFeedback(el, message, tone) {
    if (!el) {
      return;
    }

    el.textContent = message;
    el.dataset.tone = tone || '';
  }

  function setBusy(form, busy) {
    const submitButton = form.querySelector('[type="submit"]');
    if (!submitButton) {
      return;
    }

    submitButton.disabled = busy;
    submitButton.dataset.originalLabel = submitButton.dataset.originalLabel || submitButton.textContent;
    submitButton.textContent = busy ? 'Please wait...' : submitButton.dataset.originalLabel;
  }

  function ensureConfirmModal() {
    if (confirmModalState) {
      return confirmModalState;
    }

    const modal = document.createElement('div');
    modal.className = 'confirm-modal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="confirm-modal-overlay" data-confirm-modal-overlay>
        <section class="confirm-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title" aria-describedby="confirm-modal-message">
          <header class="confirm-modal-header">
            <div>
              <p class="route-eyebrow">Confirm action</p>
              <h2 id="confirm-modal-title" data-confirm-modal-title>Confirm</h2>
            </div>
            <button class="modal-close-button confirm-modal-close" type="button" data-confirm-modal-close aria-label="Close confirmation dialog">
              <span aria-hidden="true">&times;</span>
            </button>
          </header>
          <div class="confirm-modal-body">
            <p id="confirm-modal-message" class="confirm-modal-message" data-confirm-modal-message></p>
            <div class="form-actions confirm-modal-actions">
              <button class="btn btn-secondary confirm-modal-cancel" type="button" data-confirm-modal-cancel>Cancel</button>
              <button class="btn btn-primary confirm-modal-confirm" type="button" data-confirm-modal-confirm>Confirm</button>
            </div>
          </div>
        </section>
      </div>
    `;

    document.body.appendChild(modal);

    const overlay = modal.querySelector('[data-confirm-modal-overlay]');
    const title = modal.querySelector('[data-confirm-modal-title]');
    const message = modal.querySelector('[data-confirm-modal-message]');
    const closeButton = modal.querySelector('[data-confirm-modal-close]');
    const cancelButton = modal.querySelector('[data-confirm-modal-cancel]');
    const confirmButton = modal.querySelector('[data-confirm-modal-confirm]');

    const state = {
      modal,
      overlay,
      title,
      message,
      closeButton,
      cancelButton,
      confirmButton,
      resolver: null,
      previousFocus: null,
      focusConfirm: false,
    };

    function closeConfirmModal(confirmed) {
      if (!state.resolver) {
        return;
      }

      const resolve = state.resolver;
      const previousFocus = state.previousFocus;
      state.resolver = null;
      state.previousFocus = null;
      state.focusConfirm = false;
      state.modal.hidden = true;
      document.body.classList.remove('confirm-modal-open');
      resolve(confirmed);

      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus({ preventScroll: true });
      }
    }

    function trapFocus(event) {
      if (event.key !== 'Tab') {
        return;
      }

      const focusable = state.modal.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const focusableItems = Array.from(focusable).filter((element) => element.offsetParent !== null);

      if (focusableItems.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusableItems[0];
      const last = focusableItems[focusableItems.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closeConfirmModal(false);
      }
    });

    closeButton.addEventListener('click', () => {
      closeConfirmModal(false);
    });

    cancelButton.addEventListener('click', () => {
      closeConfirmModal(false);
    });

    confirmButton.addEventListener('click', () => {
      closeConfirmModal(true);
    });

    modal.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeConfirmModal(false);
        return;
      }

      trapFocus(event);
    });

    confirmModalState = state;
    confirmModalState.closeConfirmModal = closeConfirmModal;

    return confirmModalState;
  }

  function showConfirmModal(options = {}) {
    const state = ensureConfirmModal();

    const {
      title = 'Confirm action',
      message = '',
      confirmLabel = 'Confirm',
      cancelLabel = 'Cancel',
      destructive = false,
    } = options;

    if (state.resolver) {
      state.closeConfirmModal(false);
    }

    state.title.textContent = title;
    state.message.textContent = message;
    state.cancelButton.textContent = cancelLabel;
    state.confirmButton.textContent = confirmLabel;
    state.confirmButton.dataset.variant = destructive ? 'destructive' : 'primary';
    state.modal.dataset.destructive = destructive ? 'true' : 'false';
    state.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    state.modal.hidden = false;
    document.body.classList.add('confirm-modal-open');

    return new Promise((resolve) => {
      state.resolver = resolve;
      window.requestAnimationFrame(() => {
        if (state.resolver && !state.modal.hidden && state.cancelButton) {
          state.cancelButton.focus({ preventScroll: true });
        }
      });
    });
  }

  function getInitials(name) {
    const trimmed = (name || 'User').trim();
    if (!trimmed) {
      return 'U';
    }

    return trimmed
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => {
      switch (character) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#39;';
        default:
          return character;
      }
    });
  }

  function populateProfile(data) {
    const avatar = document.querySelector('[data-avatar]');
    const fullName = document.querySelector('[data-full-name]');
    const email = document.querySelector('[data-email]');
    const createdAt = document.querySelector('[data-created-at]');
    const updatedAt = document.querySelector('[data-updated-at]');
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');

    if (avatar) avatar.textContent = getInitials(data.name);
    if (fullName) fullName.textContent = data.name;
    if (email) email.textContent = data.email;
    if (createdAt) createdAt.textContent = new Date(data.createdAt).toLocaleString();
    if (updatedAt) updatedAt.textContent = new Date(data.updatedAt).toLocaleString();
    if (nameInput) nameInput.value = data.name;
    if (emailInput) emailInput.value = data.email;
  }

  function toProfileChipLink(chip) {
    if (chip.tagName.toLowerCase() === 'a') {
      chip.setAttribute('href', '/profile');
      chip.setAttribute('aria-label', 'Open your profile');
      return chip;
    }

    const link = document.createElement('a');
    link.className = chip.className;
    link.setAttribute('href', '/profile');
    link.setAttribute('aria-label', 'Open your profile');

    for (const attribute of Array.from(chip.attributes)) {
      if (attribute.name === 'class' || attribute.name === 'type' || attribute.name === 'aria-label') {
        continue;
      }

      link.setAttribute(attribute.name, attribute.value);
    }

    while (chip.firstChild) {
      link.appendChild(chip.firstChild);
    }

    chip.replaceWith(link);
    return link;
  }

  function fillProfileChip(chip, profile) {
    const link = toProfileChipLink(chip);
    const avatar = link.querySelector('.avatar');
    const name = link.querySelector('.profile-chip-copy strong');
    const email = link.querySelector('.profile-chip-copy span');

    if (avatar) {
      avatar.textContent = getInitials(profile.name);
    }

    if (name) {
      name.textContent = profile.name;
    }

    if (email) {
      email.textContent = profile.email;
    }
  }

  async function initLoginPage() {
    const form = document.querySelector('[data-login-form]');
    const feedback = document.querySelector('[data-login-feedback]');
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const registered = params.get('registered');
    const email = params.get('email');
    if (registered === '1') {
      setFeedback(feedback, 'Account created successfully. Please sign in.', 'success');
      const emailInput = form.querySelector('input[name="email"]');
      if (emailInput && email) {
        emailInput.value = email;
      }
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      setFeedback(feedback, '', '');

      if (!form.reportValidity()) {
        return;
      }

      const formData = new FormData(form);
      const emailValue = String(formData.get('email') || '').trim();
      const password = String(formData.get('password') || '');

      setBusy(form, true);
      try {
        const result = await request('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email: emailValue, password }),
        });

        setToken(result.accessToken);
        setFeedback(feedback, 'Login successful. Redirecting to your profile...', 'success');
        redirect('/profile');
      } catch (error) {
        setFeedback(feedback, error.message || 'Unable to log in', 'error');
      } finally {
        setBusy(form, false);
      }
    });
  }

  async function initRegisterPage() {
    const form = document.querySelector('[data-register-form]');
    const feedback = document.querySelector('[data-register-feedback]');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      setFeedback(feedback, '', '');

      if (!form.reportValidity()) {
        return;
      }

      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const password = String(formData.get('password') || '');

      setBusy(form, true);
      try {
        await request('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
        });

        redirect(`/login?registered=1&email=${encodeURIComponent(email)}`);
      } catch (error) {
        setFeedback(feedback, error.message || 'Unable to register', 'error');
      } finally {
        setBusy(form, false);
      }
    });
  }

  async function initClientPage() {
    const table = document.querySelector('#clients-table');
    const pageFeedback = document.querySelector('[data-client-feedback]');
    const modal = document.querySelector('[data-client-modal]');
    const modalOverlay = document.querySelector('[data-client-modal-overlay]');
    const form = document.querySelector('[data-client-form]');
    const detailPanel = document.querySelector('[data-client-detail-panel]');
    const formPanel = document.querySelector('[data-client-form-panel]');
    const modalTitle = document.querySelector('#client-modal-title');
    const modalSubtitle = document.querySelector('[data-client-modal-subtitle]');
    const openButton = document.querySelector('[data-client-create-button]');
    const archiveToggleButton = document.querySelector('[data-client-archive-toggle]');
    const closeButtons = document.querySelectorAll('[data-client-close-button]');
    const cancelButton = document.querySelector('[data-client-cancel-button]');
    const formFeedback = document.querySelector('[data-client-form-feedback]');
    const nameInput = document.querySelector('input[name="name"]');
    const allowanceInput = document.querySelector('input[name="monthlyAllowanceMinutes"]');
    const billableInput = document.querySelector('input[name="billable"]');
    const descriptionInput = document.querySelector('textarea[name="description"]');
    const idInput = document.querySelector('input[name="id"]');
    const totalCount = document.querySelector('[data-client-total]');
    const activeCount = document.querySelector('[data-client-active]');
    const archivedCount = document.querySelector('[data-client-archived]');
    const viewLabel = document.querySelector('[data-client-view-label]');
    const detailName = document.querySelector('[data-client-detail-name]');
    const detailAllowance = document.querySelector('[data-client-detail-allowance]');
    const detailBillable = document.querySelector('[data-client-detail-billable]');
    const detailStatus = document.querySelector('[data-client-detail-status]');
    const detailDescription = document.querySelector('[data-client-detail-description]');
    const detailCreatedAt = document.querySelector('[data-client-detail-created-at]');
    const detailUpdatedAt = document.querySelector('[data-client-detail-updated-at]');
    const detailEditButton = document.querySelector('[data-client-edit-button]');

    if (
      !table ||
      !modal ||
      !form ||
      !openButton ||
      !archiveToggleButton ||
      !detailPanel ||
      !formPanel
    ) {
      return;
    }

    const DataTableClass = window.DataTable;
    if (typeof DataTableClass !== 'function') {
      setFeedback(pageFeedback, 'Client table library failed to load.', 'error');
      return;
    }

    let activeClients = [];
    let archivedClients = [];
    let dataTable = null;
    let currentView = 'active';
    let currentClientId = null;
    let modalMode = 'detail';

    function setPageFeedback(message, tone) {
      if (!pageFeedback) {
        return;
      }

      setFeedback(pageFeedback, message, tone);
    }

    function setFormFeedback(message, tone) {
      setFeedback(formFeedback, message, tone);
    }

    function formatTimeMinutes(totalMinutes) {
      const minutes = Number(totalMinutes || 0);
      if (!Number.isFinite(minutes) || minutes < 0) {
        return '0m';
      }

      const hours = Math.floor(minutes / 60);
      const remainder = minutes % 60;

      if (hours === 0) {
        return `${remainder}m`;
      }

      if (remainder === 0) {
        return `${hours}h`;
      }

      return `${hours}h ${remainder}m`;
    }

    function formatDateTime(value) {
      if (!value) {
        return '--';
      }

      return new Date(value).toLocaleString();
    }

    function initialsFromName(name) {
      const trimmed = String(name || 'Client').trim();
      if (!trimmed) {
        return 'C';
      }

      return trimmed
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
    }

    function getClientList() {
      return currentView === 'archived' ? archivedClients : activeClients;
    }

    function findClientById(id) {
      return [...activeClients, ...archivedClients].find((client) => client.id === id) || null;
    }

    function getRouteClientId() {
      const match = window.location.pathname.match(/^\/clients\/(\d+)$/);
      if (!match) {
        return null;
      }

      return Number.parseInt(match[1], 10);
    }

    function setModalMode(mode) {
      modalMode = mode;
      const isFormMode = mode === 'form';

      formPanel.hidden = !isFormMode;
      detailPanel.hidden = isFormMode;
      if (detailEditButton) {
        detailEditButton.hidden = isFormMode;
      }

      if (modalTitle) {
        modalTitle.textContent = isFormMode
          ? currentClientId
            ? 'Edit client'
            : 'Create client'
          : 'Client details';
      }

      if (modalSubtitle) {
        modalSubtitle.textContent = isFormMode
          ? 'Manage the client record and monthly allowance.'
          : 'Review client allowance, billing behavior, and archive state.';
      }
    }

    function fillDetailModal(client) {
      if (!client) {
        return;
      }

      if (detailName) {
        detailName.textContent = client.name;
      }

      if (detailAllowance) {
        detailAllowance.textContent = formatTimeMinutes(client.monthlyAllowanceMinutes);
      }

      if (detailBillable) {
        detailBillable.textContent = client.billable ? 'Billable overflow enabled' : 'Overflow not billable';
      }

      if (detailStatus) {
        detailStatus.textContent = client.archivedAt ? 'Archived' : 'Active';
        detailStatus.dataset.state = client.archivedAt ? 'archived' : 'active';
      }

      if (detailDescription) {
        detailDescription.textContent = client.description || 'No description provided.';
      }

      if (detailCreatedAt) {
        detailCreatedAt.textContent = formatDateTime(client.createdAt);
      }

      if (detailUpdatedAt) {
        detailUpdatedAt.textContent = formatDateTime(client.updatedAt);
      }

      if (detailEditButton) {
        detailEditButton.disabled = client.archivedAt ? false : false;
        detailEditButton.textContent = client.archivedAt ? 'Edit archived client' : 'Edit client';
      }
    }

    function fillForm(client) {
      if (idInput) {
        idInput.value = client ? String(client.id) : '';
      }

      if (nameInput) {
        nameInput.value = client?.name ?? '';
      }

      if (allowanceInput) {
        allowanceInput.value = client ? String(client.monthlyAllowanceMinutes ?? 0) : '0';
      }

      if (billableInput) {
        billableInput.checked = Boolean(client?.billable);
      }

      if (descriptionInput) {
        descriptionInput.value = client?.description ?? '';
      }
    }

    function openModal(mode, client = null, options = {}) {
      currentClientId = client ? client.id : null;
      setModalMode(mode);
      setFormFeedback('', '');
      fillForm(mode === 'form' ? client : null);
      if (mode === 'detail') {
        fillDetailModal(client);
      }
      modal.hidden = false;
      if (options.pushState) {
        const nextPath = client ? `/clients/${client.id}` : '/clients';
        window.history.pushState(
          {
            clientId: client ? client.id : null,
            modalMode: mode,
          },
          '',
          nextPath,
        );
      }

      window.setTimeout(() => {
        if (mode === 'form') {
          nameInput?.focus();
        } else {
          detailEditButton?.focus();
        }
      }, 0);
    }

    function closeModal() {
      modal.hidden = true;
      currentClientId = null;
      form.reset();
      setFormFeedback('', '');
      setModalMode('detail');

      if (window.location.pathname.startsWith('/clients/')) {
        if (window.history.state && window.history.state.clientId) {
          window.history.back();
        } else {
          window.history.replaceState({}, '', '/clients');
        }
      }
    }

    function renderStats() {
      const activeTotal = activeClients.length;
      const archivedTotal = archivedClients.length;
      const allTotal = activeTotal + archivedTotal;

      if (totalCount) {
        totalCount.textContent = String(allTotal);
      }

      if (activeCount) {
        activeCount.textContent = String(activeTotal);
      }

      if (archivedCount) {
        archivedCount.textContent = String(archivedTotal);
      }

      if (viewLabel) {
        viewLabel.textContent = currentView === 'archived' ? 'Archived clients' : 'Active clients';
      }

      if (archiveToggleButton) {
        archiveToggleButton.textContent =
          currentView === 'archived' ? 'View Active Clients' : 'View Archived Clients';
      }
    }

    function renderTable() {
      const rows = getClientList();
      const DataTable = DataTableClass;

      if (dataTable) {
        dataTable.destroy();
        dataTable = null;
      }

      table.innerHTML = `
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Monthly Allowance</th>
            <th>Billable</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;

      dataTable = new DataTable(table, {
        data: rows,
        pageLength: 10,
        lengthMenu: [10, 25, 50, 100],
        autoWidth: false,
        order: [[0, 'asc']],
        deferRender: true,
        language: {
          emptyTable:
            currentView === 'archived'
              ? 'No archived clients found.'
              : 'No active clients found.',
        },
        columns: [
          {
            data: null,
            render: (_data, type, row) => {
              if (type !== 'display') {
                return row.name;
              }

              return `
                <button class="client-name-link" type="button" data-client-action="detail" data-client-id="${row.id}">
                  <span class="client-avatar" aria-hidden="true">${initialsFromName(row.name)}</span>
                  <span class="client-name-copy">
                    <strong>${row.name}</strong>
                    <span>${row.description ? row.description : 'Open client details'}</span>
                  </span>
                </button>
              `;
            },
          },
          {
            data: 'monthlyAllowanceMinutes',
            render: (value, type) => {
              if (type === 'sort' || type === 'type') {
                return Number(value || 0);
              }

              return formatTimeMinutes(value);
            },
          },
          {
            data: 'billable',
            render: (value, type) => {
              if (type === 'sort' || type === 'type') {
                return value ? 1 : 0;
              }

              return `<span class="status-pill ${value ? 'status-pill-blue' : 'status-pill-muted'}">${
                value ? 'Billable' : 'Not billable'
              }</span>`;
            },
          },
          {
            data: 'archivedAt',
            render: (value, type) => {
              const isArchived = Boolean(value);

              if (type === 'sort' || type === 'type') {
                return isArchived ? 1 : 0;
              }

              return `<span class="status-pill ${isArchived ? 'status-pill-muted' : 'status-pill-green'}">${
                isArchived ? 'Archived' : 'Active'
              }</span>`;
            },
          },
          {
            data: null,
            orderable: false,
            searchable: false,
            render: (_data, type, row) => {
              if (type !== 'display') {
                return '';
              }

              const actionLabel = currentView === 'archived' ? 'Restore' : 'Archive';
              const actionType = currentView === 'archived' ? 'restore' : 'archive';

              return `
                <div class="client-actions">
                  <button class="client-action client-action-edit" type="button" data-client-action="edit" data-client-id="${row.id}">Edit</button>
                  <button class="client-action ${currentView === 'archived' ? 'client-action-restore' : 'client-action-archive'}" type="button" data-client-action="${actionType}" data-client-id="${row.id}">${actionLabel}</button>
                </div>
              `;
            },
          },
        ],
      });
    }

    function openClientDetail(client, options = {}) {
      currentClientId = client.id;
      openModal('detail', client, { pushState: Boolean(options.pushState) });
    }

    function openClientForm(client = null, options = {}) {
      currentClientId = client ? client.id : null;
      openModal('form', client, { pushState: Boolean(options.pushState) });
    }

    async function loadTableData() {
      try {
        const [active, archived] = await Promise.all([
          request('/api/clients'),
          request('/api/clients/archived'),
        ]);

        activeClients = Array.isArray(active) ? active : [];
        archivedClients = Array.isArray(archived) ? archived : [];

        renderStats();
        renderTable();

        const routeClientId = getRouteClientId();
        if (routeClientId) {
          await openRouteClient(routeClientId);
        }
      } catch (error) {
        if (error.status === 401) {
          clearToken();
          redirect('/login');
          return;
        }

        setPageFeedback(error.message || 'Unable to load clients', 'error');
      }
    }

    async function openRouteClient(clientId) {
      const cached = findClientById(clientId);

      if (cached) {
        openClientDetail(cached, { pushState: false });
        return;
      }

      try {
        const client = await request(`/api/clients/${clientId}`);
        openClientDetail(client, { pushState: false });
      } catch (error) {
        if (error.status === 401) {
          clearToken();
          redirect('/login');
          return;
        }

        setPageFeedback(error.message || 'Unable to load client details', 'error');
      }
    }

    async function refreshClients(keepView = true) {
      const previousView = currentView;
      await loadTableData();
      currentView = keepView ? previousView : 'active';
      renderStats();
      renderTable();
    }

    function getCurrentFormPayload() {
      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const description = String(formData.get('description') || '').trim();
      const monthlyAllowanceMinutes = Number.parseInt(
        String(formData.get('monthlyAllowanceMinutes') || '0'),
        10,
      );
      const billable = Boolean(formData.get('billable'));

      return {
        name,
        description,
        monthlyAllowanceMinutes: Number.isNaN(monthlyAllowanceMinutes) ? 0 : monthlyAllowanceMinutes,
        billable,
      };
    }

    function updateOpenClientFromPayload(client) {
      activeClients = activeClients.map((item) => (item.id === client.id ? client : item));
      archivedClients = archivedClients.map((item) => (item.id === client.id ? client : item));

      if (client.archivedAt) {
        activeClients = activeClients.filter((item) => item.id !== client.id);
        if (!archivedClients.some((item) => item.id === client.id)) {
          archivedClients = [client, ...archivedClients];
        }
      } else {
        archivedClients = archivedClients.filter((item) => item.id !== client.id);
        if (!activeClients.some((item) => item.id === client.id)) {
          activeClients = [client, ...activeClients];
        }
      }

      renderStats();
      renderTable();
    }

    async function submitForm(event) {
      event.preventDefault();
      setFormFeedback('', '');

      if (!form.reportValidity()) {
        return;
      }

      const payload = getCurrentFormPayload();

      setBusy(form, true);
      try {
        let client;

        if (currentClientId) {
          client = await request(`/api/clients/${currentClientId}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
          });
          setPageFeedback('Client updated successfully.', 'success');
        } else {
          client = await request('/api/clients', {
            method: 'POST',
            body: JSON.stringify(payload),
          });
          setPageFeedback('Client created successfully.', 'success');
        }

        updateOpenClientFromPayload(client);
        closeModal();
        await loadTableData();
      } catch (error) {
        if (error.status === 401) {
          clearToken();
          redirect('/login');
          return;
        }

        setFormFeedback(error.message || 'Unable to save client', 'error');
      } finally {
        setBusy(form, false);
      }
    }

    async function archiveClient(clientId) {
      const selectedClient = findClientById(clientId);
      const actionLabel = currentView === 'archived' ? 'restore' : 'archive';
      const confirmed = await showConfirmModal({
        title: `${actionLabel.charAt(0).toUpperCase()}${actionLabel.slice(1)} client`,
        message: `Are you sure you want to ${actionLabel} ${selectedClient ? `"${selectedClient.name}"` : 'this client'}?`,
        confirmLabel: actionLabel.charAt(0).toUpperCase() + actionLabel.slice(1),
        cancelLabel: 'Cancel',
        destructive: actionLabel === 'archive',
      });

      if (!confirmed) {
        return;
      }

      try {
        if (currentView === 'archived') {
          await request(`/api/clients/${clientId}/restore`, {
            method: 'PATCH',
          });
          setPageFeedback('Client restored successfully.', 'success');
        } else {
          await request(`/api/clients/${clientId}/archive`, {
            method: 'PATCH',
          });
          setPageFeedback('Client archived successfully.', 'success');
        }

        if (currentClientId === clientId) {
          closeModal();
        }

        await loadTableData();
      } catch (error) {
        if (error.status === 401) {
          clearToken();
          redirect('/login');
          return;
        }

        setPageFeedback(error.message || 'Unable to archive client', 'error');
      }
    }

    function wireTableActions() {
      table.addEventListener('click', (event) => {
        const actionButton = event.target.closest('[data-client-action]');
        if (!actionButton) {
          return;
        }

        const clientId = Number.parseInt(actionButton.dataset.clientId || '', 10);
        if (Number.isNaN(clientId)) {
          return;
        }

        const client = findClientById(clientId);
        const action = actionButton.dataset.clientAction;

        if (action === 'detail' && client) {
          openClientDetail(client, { pushState: true });
        }

        if (action === 'edit' && client) {
          openClientForm(client, { pushState: false });
        }

        if ((action === 'archive' || action === 'restore') && client) {
          void archiveClient(client.id);
        }
      });
    }

    function handlePopState() {
      const routeClientId = getRouteClientId();
      if (routeClientId) {
        void openRouteClient(routeClientId);
        return;
      }

      modal.hidden = true;
      currentClientId = null;
      setModalMode('detail');
    }

    openButton.addEventListener('click', () => openClientForm(null, { pushState: false }));

    if (archiveToggleButton) {
      archiveToggleButton.addEventListener('click', () => {
        currentView = currentView === 'archived' ? 'active' : 'archived';
        renderStats();
        renderTable();
      });
    }

    closeButtons.forEach((button) => {
      button.addEventListener('click', closeModal);
    });

    if (cancelButton) {
      cancelButton.addEventListener('click', closeModal);
    }

    if (detailEditButton) {
      detailEditButton.addEventListener('click', () => {
        const client = currentClientId ? findClientById(currentClientId) : null;
        if (client) {
          openClientForm(client, { pushState: false });
        }
      });
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
          closeModal();
        }
      });
    } else {
      modal.addEventListener('click', (event) => {
        if (event.target === modal) {
          closeModal();
        }
      });
    }

    form.addEventListener('submit', submitForm);
    wireTableActions();
    window.addEventListener('popstate', handlePopState);

    await loadTableData();
  }

  async function initTaskPage() {
    const table = document.querySelector('#tasks-table');
    const pageFeedback = document.querySelector('[data-task-feedback]');
    const modal = document.querySelector('[data-task-modal]');
    const modalOverlay = document.querySelector('[data-task-modal-overlay]');
    const form = document.querySelector('[data-task-form]');
    const modalTitle = document.querySelector('#task-modal-title');
    const modalSubtitle = document.querySelector('[data-task-modal-subtitle]');
    const openButton = document.querySelector('[data-task-create-button]');
    const resetFiltersButton = document.querySelector('[data-task-reset-filters]');
    const closeButtons = document.querySelectorAll('[data-task-close-button]');
    const cancelButton = document.querySelector('[data-task-cancel-button]');
    const formFeedback = document.querySelector('[data-task-form-feedback]');
    const titleInput = document.querySelector('input[name="title"]');
    const clientSelect = document.querySelector('select[name="clientId"]');
    const userSelect = document.querySelector('select[name="userId"]');
    const prioritySelect = document.querySelector('select[name="priority"]');
    const statusSelect = document.querySelector('select[name="status"]');
    const idInput = document.querySelector('input[name="id"]');
    const clientFilter = document.querySelector('[data-task-client-filter]');
    const userFilter = document.querySelector('[data-task-user-filter]');
    const totalCount = document.querySelector('[data-task-total]');
    const openCount = document.querySelector('[data-task-open]');
    const completedCount = document.querySelector('[data-task-completed]');
    const labelSelector = document.querySelector('[data-task-label-selector]');
    const labelHelp = document.querySelector('[data-task-label-help]');

    if (!table || !modal || !form || !openButton || !clientSelect || !userSelect || !labelSelector) {
      return;
    }

    const DataTableClass = window.DataTable;
    if (typeof DataTableClass !== 'function') {
      setFeedback(pageFeedback, 'Task table library failed to load.', 'error');
      return;
    }

    const privilegedRoles = new Set(['ADMIN', 'MANAGER']);

    let currentUser = null;
    let activeClients = [];
    let archivedClients = [];
    let users = [];
    let tasks = [];
    let dataTable = null;
    let currentTaskId = null;
    let currentClientFilter = '';
    let currentUserFilter = '';
    let openTaskLabelTaskId = null;
    let openTaskLabelAnchor = null;
    let taskLabelOverlayRoot = null;
    let taskLabelOverlayPanel = null;
    let taskLabelCatalog = [];
    let selectedLabels = [];

    function setPageFeedback(message, tone) {
      setFeedback(pageFeedback, message, tone);
    }

    function setFormFeedback(message, tone) {
      setFeedback(formFeedback, message, tone);
    }

    function isPrivileged() {
      return Boolean(currentUser && privilegedRoles.has(currentUser.role));
    }

    function normalizeLabel(value) {
      return String(value || '').trim().replace(/\s+/g, ' ');
    }

    function formatTaskStatus(value) {
      switch (value) {
        case 'IN_PROGRESS':
          return 'In Progress';
        case 'TO_REVIEW':
          return 'To Review';
        case 'COMPLETED':
          return 'Completed';
        case 'ON_HOLD':
          return 'On Hold';
        default:
          return 'Open';
      }
    }

    function formatTaskPriority(value) {
      switch (value) {
        case 'LOW':
          return 'Low';
        case 'HIGH':
          return 'High';
        default:
          return 'Medium';
      }
    }

    function taskStatusClass(value) {
      switch (value) {
        case 'IN_PROGRESS':
          return 'status-pill-blue';
        case 'TO_REVIEW':
          return 'status-pill-orange';
        case 'COMPLETED':
          return 'status-pill-purple';
        case 'ON_HOLD':
          return 'status-pill-red';
        default:
          return 'status-pill-green';
      }
    }

    function taskPriorityClass(value) {
      switch (value) {
        case 'LOW':
          return 'status-pill-muted';
        case 'HIGH':
          return 'status-pill-red';
        default:
          return 'status-pill-blue';
      }
    }

    function getAllClients() {
      return [...activeClients, ...archivedClients];
    }

    function findTaskById(id) {
      return tasks.find((task) => task.id === id) || null;
    }

    function findTaskLabels(task) {
      return Array.isArray(task?.labels) ? task.labels : [];
    }

    function getFilteredTasks() {
      return tasks.filter((task) => {
        if (currentClientFilter && String(task.clientId) !== currentClientFilter) {
          return false;
        }

        if (currentUserFilter && String(task.userId) !== currentUserFilter) {
          return false;
        }

        return true;
      });
    }

    function updateStats(list) {
      const total = list.length;
      const open = list.filter((task) => task.status !== 'COMPLETED').length;
      const completed = list.filter((task) => task.status === 'COMPLETED').length;

      if (totalCount) {
        totalCount.textContent = String(total);
      }

      if (openCount) {
        openCount.textContent = String(open);
      }

      if (completedCount) {
        completedCount.textContent = String(completed);
      }
    }

    function buildLabelCatalog(list) {
      const seen = new Set();
      const labels = [];

      list.forEach((label) => {
        const name = normalizeLabel(label.name);

        if (!name) {
          return;
        }

        const key = name.toLowerCase();
        if (seen.has(key)) {
          return;
        }

        seen.add(key);
        labels.push({ ...label, name });
      });

      labels.sort((left, right) => left.name.localeCompare(right.name));
      return labels;
    }

    function getTaskLabelSummary(labels) {
      const normalized = labels.map((label) => label.name).filter(Boolean);

      if (normalized.length === 0) {
        return 'No labels';
      }

      if (normalized.length === 1) {
        return normalized[0];
      }

      return `${normalized[0]} +${normalized.length - 1}`;
    }

    function getAvailableLabelsForTask(taskId) {
      const task = findTaskById(taskId);
      const taskLabelNames = findTaskLabels(task).map((label) => normalizeLabel(label.name));
      return taskLabelCatalog.filter((label) => !taskLabelNames.includes(label.name));
    }

    function renderTaskLabelTrigger(task) {
      const taskLabels = findTaskLabels(task);

      return `
        <button
          type="button"
          class="task-label-trigger ${openTaskLabelTaskId === task.id ? 'is-open' : ''}"
          data-task-label-toggle="${task.id}"
          aria-label="Show labels for ${escapeHtml(task.title)}"
          aria-expanded="${openTaskLabelTaskId === task.id ? 'true' : 'false'}"
        >
          <span>${escapeHtml(getTaskLabelSummary(taskLabels))}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" class="task-label-trigger-icon">
            <path d="m7 10 5 5 5-5" />
          </svg>
        </button>
      `;
    }

    function renderTaskLabelPopover(taskId) {
      const task = findTaskById(taskId);

      if (!task) {
        return '';
      }

      const taskLabels = findTaskLabels(task);
      const availableLabels = getAvailableLabelsForTask(taskId);
      const currentLabelsHtml = taskLabels.length
        ? taskLabels
            .map(
              (label) => `
                <span class="task-label-chip">
                  ${escapeHtml(label.name)}
                  <button
                    type="button"
                    aria-label="Remove ${escapeHtml(label.name)}"
                    data-task-label-overlay-remove="${task.id}"
                    data-label-name="${escapeHtml(label.name)}"
                  >&times;</button>
                </span>
              `,
            )
            .join('')
        : '<span class="task-label-empty">No labels on this task.</span>';

      const canAddLabel = availableLabels.length > 0;
      const existingLabelOptions = canAddLabel
        ? [
            '<option value="">Select a label</option>',
            ...availableLabels.map((label) => `<option value="${escapeHtml(label.name)}">${escapeHtml(label.name)}</option>`),
          ].join('')
        : '<option value="">No more labels in catalog</option>';

      return `
        <div class="task-label-popover-head">
          <div>
            <div class="task-label-popover-title">Current labels</div>
            <div class="task-label-popover-subtitle">${escapeHtml(task.title)}</div>
          </div>
          <button type="button" class="task-label-popover-close" data-task-label-overlay-close aria-label="Close labels popover">
            &times;
          </button>
        </div>
        <div class="task-label-popover-section">
          <div class="task-label-chip-row task-label-chip-row-inline">
            ${currentLabelsHtml}
          </div>
        </div>
        <div class="task-label-popover-section">
          <div class="task-label-menu-title">Add existing label</div>
          <div class="task-label-add-row">
            <select class="task-label-select-inline" data-task-label-overlay-select="${task.id}" ${canAddLabel ? '' : 'disabled'}>
              ${existingLabelOptions}
            </select>
            <button type="button" class="task-label-add-button" data-task-label-overlay-add="${task.id}" ${canAddLabel ? '' : 'disabled'}>Add</button>
          </div>
        </div>
      `;
    }

    function renderClientAndUserSelects() {
      const clientOptions = ['<option value="">Select a client</option>']
        .concat(
          getAllClients().map(
            (client) => `<option value="${client.id}">${escapeHtml(client.name)}</option>`,
          ),
        )
        .join('');

      const userOptions = ['<option value="">Select a user</option>']
        .concat(
          users.map(
            (user) => `<option value="${user.id}">${escapeHtml(user.name)} (${escapeHtml(user.role)})</option>`,
          ),
        )
        .join('');

      clientSelect.innerHTML = clientOptions;
      userSelect.innerHTML = userOptions;
    }

    function renderFilterOptions() {
      if (clientFilter) {
        const options = ['<option value="">All clients</option>']
          .concat(
            getAllClients().map(
              (client) => `<option value="${client.id}">${escapeHtml(client.name)}</option>`,
            ),
          )
          .join('');

        clientFilter.innerHTML = options;
        clientFilter.value = currentClientFilter;
      }

      if (userFilter) {
        const options = ['<option value="">All users</option>']
          .concat(
            users.map(
              (user) => `<option value="${user.id}">${escapeHtml(user.name)} (${escapeHtml(user.role)})</option>`,
            ),
          )
          .join('');

        userFilter.innerHTML = options;
        userFilter.value = currentUserFilter;
      }
    }

    function setSelectedLabels(labels) {
      selectedLabels = [...new Set(labels.map(normalizeLabel).filter(Boolean))];
      renderLabelSelector();
    }

    function addLabel(label) {
      const normalized = normalizeLabel(label);
      if (!normalized) {
        return;
      }

      if (!selectedLabels.includes(normalized)) {
        selectedLabels = [...selectedLabels, normalized].sort((left, right) => left.localeCompare(right));
        renderLabelSelector();
      }
    }

    function removeLabel(label) {
      selectedLabels = selectedLabels.filter((item) => item !== label);
      renderLabelSelector();
    }

    function renderLabelSelector() {
      if (!labelSelector) {
        return;
      }

      const labels = taskLabelCatalog;
      const allowedLabels = new Set(labels.map((label) => label.name));
      selectedLabels = selectedLabels.filter((label) => allowedLabels.has(label));

      if (labels.length === 0) {
        labelSelector.innerHTML = `
          <div class="empty-shell empty-shell-inline">
            <div>
              <strong>No labels yet</strong>
              <p>Add labels from Settings, then return here to assign them to tasks.</p>
            </div>
          </div>
        `;
      } else {
        const size = Math.min(Math.max(labels.length, 3), 8);
        const options = labels
          .map(
            (label) => `
              <option value="${escapeHtml(label.name)}" ${selectedLabels.includes(label.name) ? 'selected' : ''}>
                ${escapeHtml(label.name)}
              </option>
            `,
          )
          .join('');

        labelSelector.innerHTML = `
          <select class="task-label-select" data-task-label-select multiple size="${size}">
            ${options}
          </select>
        `;

        const select = labelSelector.querySelector('[data-task-label-select]');
        select?.addEventListener('change', () => {
          const next = Array.from(select.selectedOptions).map((option) => normalizeLabel(option.value));
          selectedLabels = [...new Set(next.filter(Boolean))].sort((left, right) => left.localeCompare(right));
        });
      }

      if (labelHelp) {
        labelHelp.textContent = 'Select labels from the global catalog. Manage labels in Settings.';
      }
    }

    function renderTable() {
      const rows = getFilteredTasks();

      if (dataTable) {
        dataTable.destroy();
        dataTable = null;
      }

      table.innerHTML = `
        <thead>
          <tr>
            <th>Task</th>
            <th>Client</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Labels</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;

      dataTable = new DataTableClass(table, {
        data: rows,
        pageLength: 10,
        lengthMenu: [10, 25, 50, 100],
        autoWidth: false,
        order: [[0, 'asc']],
        deferRender: true,
        language: {
          emptyTable: 'No tasks found for the selected filters.',
        },
        columns: [
          {
            data: 'title',
            render: (value, type, row) => {
              if (type !== 'display') {
                return value;
              }

              return `
                <div class="task-name-copy">
                  <strong>${escapeHtml(value)}</strong>
                  <span>${escapeHtml(row.user?.name || 'Unassigned')}</span>
                </div>
              `;
            },
          },
          {
            data: 'client.name',
            render: (value, type) => (type === 'display' ? escapeHtml(value) : value),
          },
          {
            data: 'status',
            render: (value, type) => {
              if (type === 'sort' || type === 'type') {
                return value;
              }

              return `<span class="status-pill ${taskStatusClass(value)}">${escapeHtml(formatTaskStatus(value))}</span>`;
            },
          },
          {
            data: 'priority',
            render: (value, type) => {
              if (type === 'sort' || type === 'type') {
                return value;
              }

              return `<span class="status-pill ${taskPriorityClass(value)}">${escapeHtml(formatTaskPriority(value))}</span>`;
            },
          },
          {
            data: 'labels',
            width: '240px',
            className: 'task-label-cell',
            orderable: false,
            render: (value, type, row) => {
              if (type !== 'display') {
                return (value || []).map((label) => label.name).join(', ');
              }

              return renderTaskLabelTrigger({
                id: row.id,
                title: row.title,
                labels: Array.isArray(value) ? value : [],
              });
            },
          },
          {
            data: null,
            orderable: false,
            searchable: false,
            render: (_value, type, row) => {
              if (type !== 'display') {
                return '';
              }

              return `
                <div class="task-actions">
                  <button class="client-action client-action-edit" type="button" data-task-action="edit" data-task-id="${row.id}">Edit</button>
                  <button class="client-action client-action-archive" type="button" data-task-action="delete" data-task-id="${row.id}">Delete</button>
                </div>
              `;
            },
          },
        ],
      });

      if (typeof dataTable.on === 'function') {
        dataTable.on('draw', closeTaskLabelOverlay);
      }
    }

    function fillForm(task) {
      if (idInput) {
        idInput.value = task ? String(task.id) : '';
      }

      if (titleInput) {
        titleInput.value = task?.title ?? '';
      }

      if (clientSelect) {
        clientSelect.value = task ? String(task.clientId) : '';
      }

      if (userSelect) {
        userSelect.value = task ? String(task.userId) : '';
      }

      if (prioritySelect) {
        prioritySelect.value = task?.priority ?? 'MEDIUM';
      }

      if (statusSelect) {
        statusSelect.value = task?.status ?? 'OPEN';
      }

      setSelectedLabels((task?.labels || []).map((label) => label.name));
    }

    function openModal(task = null) {
      closeTaskLabelOverlay();
      currentTaskId = task ? task.id : null;
      setFormFeedback('', '');
      fillForm(task);
      if (modalTitle) {
        modalTitle.textContent = task ? 'Edit task' : 'Create task';
      }
      if (modalSubtitle) {
        modalSubtitle.textContent = task
          ? 'Update task details, assignment, priority, status, and labels.'
          : 'Assign the task to a client and a user, then choose labels from the global catalog.';
      }
      modal.hidden = false;
      window.setTimeout(() => {
        titleInput?.focus();
      }, 0);
    }

    function closeModal() {
      modal.hidden = true;
      currentTaskId = null;
      selectedLabels = [];
      form.reset();
      setFormFeedback('', '');
      renderLabelSelector();
      closeTaskLabelOverlay();
    }

    function ensureTaskLabelOverlay() {
      if (taskLabelOverlayRoot) {
        return;
      }

      taskLabelOverlayRoot = document.createElement('div');
      taskLabelOverlayRoot.className = 'task-label-overlay';
      taskLabelOverlayRoot.hidden = true;
      taskLabelOverlayRoot.innerHTML = `
        <div class="task-label-popover" role="dialog" aria-modal="false" aria-label="Task labels"></div>
      `;
      taskLabelOverlayPanel = taskLabelOverlayRoot.querySelector('.task-label-popover');
      document.body.appendChild(taskLabelOverlayRoot);

      taskLabelOverlayRoot.addEventListener('click', (event) => {
        if (event.target === taskLabelOverlayRoot) {
          closeTaskLabelOverlay();
          return;
        }

        const closeButton = event.target.closest('[data-task-label-overlay-close]');
        if (closeButton) {
          closeTaskLabelOverlay();
          return;
        }

        const removeButton = event.target.closest('[data-task-label-overlay-remove]');
        if (removeButton) {
          const taskId = Number.parseInt(removeButton.dataset.taskLabelOverlayRemove || '', 10);
          const labelName = removeButton.dataset.labelName || '';
          if (!Number.isNaN(taskId) && labelName) {
            const task = findTaskById(taskId);
            const nextLabels = findTaskLabels(task)
              .map((label) => normalizeLabel(label.name))
              .filter((label) => label !== normalizeLabel(labelName));
            void persistTaskLabels(taskId, nextLabels, 'Label removed successfully.');
          }
          return;
        }

        const addButton = event.target.closest('[data-task-label-overlay-add]');
        if (addButton) {
          const taskId = Number.parseInt(addButton.dataset.taskLabelOverlayAdd || '', 10);
          if (Number.isNaN(taskId)) {
            return;
          }

          const select = taskLabelOverlayPanel?.querySelector(`[data-task-label-overlay-select="${taskId}"]`);
          const value = normalizeLabel(String(select?.value || ''));

          if (value) {
            const task = findTaskById(taskId);
            const nextLabels = [
              ...new Set(
                [...findTaskLabels(task).map((label) => normalizeLabel(label.name)), value].filter(Boolean),
              ),
            ].sort((left, right) => left.localeCompare(right));

            if (select) {
              select.value = '';
            }

            void persistTaskLabels(taskId, nextLabels, 'Label added successfully.');
          }

          return;
        }

      });
    }

    function closeTaskLabelOverlay() {
      openTaskLabelTaskId = null;
      openTaskLabelAnchor = null;

      if (taskLabelOverlayRoot) {
        taskLabelOverlayRoot.hidden = true;
        taskLabelOverlayRoot.classList.remove('is-open');
      }

      syncTaskLabelTriggerStates();

      if (taskLabelOverlayPanel) {
        taskLabelOverlayPanel.innerHTML = '';
        taskLabelOverlayPanel.style.top = '';
        taskLabelOverlayPanel.style.left = '';
        taskLabelOverlayPanel.style.visibility = '';
      }
    }

    function syncTaskLabelTriggerStates() {
      table.querySelectorAll('[data-task-label-toggle]').forEach((button) => {
        const taskId = Number.parseInt(button.dataset.taskLabelToggle || '', 10);
        const isOpen = !Number.isNaN(taskId) && taskId === openTaskLabelTaskId;
        button.classList.toggle('is-open', isOpen);
        button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    function positionTaskLabelOverlay(anchor) {
      if (!taskLabelOverlayRoot || !taskLabelOverlayPanel || !anchor) {
        return;
      }

      const anchorRect = anchor.getBoundingClientRect();
      const padding = 12;
      const gap = 10;
      const panelWidth = Math.min(340, window.innerWidth - padding * 2);
      const panelHeight = taskLabelOverlayPanel.getBoundingClientRect().height;

      let left = anchorRect.left;
      let top = anchorRect.bottom + gap;

      if (left + panelWidth > window.innerWidth - padding) {
        left = window.innerWidth - padding - panelWidth;
      }

      left = Math.max(padding, left);

      if (top + panelHeight > window.innerHeight - padding) {
        top = anchorRect.top - gap - panelHeight;
      }

      top = Math.max(padding, Math.min(top, window.innerHeight - padding - panelHeight));

      taskLabelOverlayPanel.style.left = `${Math.round(left)}px`;
      taskLabelOverlayPanel.style.top = `${Math.round(top)}px`;
      taskLabelOverlayPanel.style.visibility = 'visible';
    }

    function openTaskLabelOverlay(taskId, anchor) {
      const task = findTaskById(taskId);

      if (!task) {
        return;
      }

      ensureTaskLabelOverlay();
      openTaskLabelTaskId = taskId;
      openTaskLabelAnchor = anchor || null;
      taskLabelOverlayPanel.innerHTML = renderTaskLabelPopover(taskId);
      taskLabelOverlayRoot.hidden = false;
      taskLabelOverlayRoot.classList.add('is-open');
      syncTaskLabelTriggerStates();
      taskLabelOverlayPanel.style.visibility = 'hidden';
      positionTaskLabelOverlay(anchor || taskLabelOverlayRoot);
    }

    function refreshTaskLabelOverlayPosition() {
      if (!openTaskLabelTaskId || !taskLabelOverlayRoot || taskLabelOverlayRoot.hidden) {
        return;
      }

      const anchor = openTaskLabelAnchor || table.querySelector(`[data-task-label-toggle="${openTaskLabelTaskId}"]`);
      if (!anchor) {
        closeTaskLabelOverlay();
        return;
      }

      positionTaskLabelOverlay(anchor);
    }

    async function persistTaskLabels(taskId, nextLabels, successMessage) {
      const task = findTaskById(taskId);
      if (!task) {
        return;
      }

      const currentLabels = findTaskLabels(task)
        .map((label) => normalizeLabel(label.name))
        .filter(Boolean)
        .sort((left, right) => left.localeCompare(right));
      const normalizedNextLabels = [...new Set(nextLabels.map(normalizeLabel).filter(Boolean))].sort(
        (left, right) => left.localeCompare(right),
      );

      if (currentLabels.join('|') === normalizedNextLabels.join('|')) {
        return;
      }

      try {
        const updatedTask = await request(`/api/tasks/${taskId}`, {
          method: 'PUT',
          body: JSON.stringify({ labels: normalizedNextLabels }),
        });

        tasks = tasks.map((item) => (item.id === updatedTask.id ? updatedTask : item));
        closeTaskLabelOverlay();
        setPageFeedback(successMessage, 'success');
        refreshView();
      } catch (error) {
        if (error.status === 401) {
          clearToken();
          redirect('/login');
          return;
        }

        setPageFeedback(error.message || 'Unable to update task labels', 'error');
      }
    }

    function refreshView() {
      closeTaskLabelOverlay();

      renderFilterOptions();
      renderStats(getFilteredTasks());
      renderTable();
    }

    function getFormPayload() {
      const formData = new FormData(form);
      const title = String(formData.get('title') || '').trim();
      const clientId = Number.parseInt(String(formData.get('clientId') || ''), 10);
      const userId = Number.parseInt(String(formData.get('userId') || ''), 10);
      const priority = String(formData.get('priority') || 'MEDIUM');
      const status = String(formData.get('status') || 'OPEN');

      return {
        title,
        clientId: Number.isNaN(clientId) ? 0 : clientId,
        userId: Number.isNaN(userId) ? 0 : userId,
        priority,
        status,
        labels: [...selectedLabels],
      };
    }

    async function loadData() {
      try {
        const [profile, active, archived, allUsers, taskRows, labelRows] = await Promise.all([
          request('/users/me'),
          request('/api/clients'),
          request('/api/clients/archived'),
          request('/users'),
          request('/api/tasks'),
          request('/api/task-labels'),
        ]);

        currentUser = profile;
        activeClients = Array.isArray(active) ? active : [];
        archivedClients = Array.isArray(archived) ? archived : [];
        users = Array.isArray(allUsers) ? allUsers : [];
        tasks = Array.isArray(taskRows) ? taskRows : [];
        taskLabelCatalog = buildLabelCatalog(Array.isArray(labelRows) ? labelRows : []);

        renderClientAndUserSelects();
        renderFilterOptions();
        renderLabelSelector();
        refreshView();
      } catch (error) {
        if (error.status === 401) {
          clearToken();
          redirect('/login');
          return;
        }

        setPageFeedback(error.message || 'Unable to load tasks', 'error');
      }
    }

    async function submitForm(event) {
      event.preventDefault();
      setFormFeedback('', '');

      if (!form.reportValidity()) {
        return;
      }

      const payload = getFormPayload();

      if (!payload.title || payload.clientId <= 0 || payload.userId <= 0) {
        setFormFeedback('Please complete the task title, client, and assigned user.', 'error');
        return;
      }

      setBusy(form, true);
      try {
        let task;

        if (currentTaskId) {
          task = await request(`/api/tasks/${currentTaskId}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
          });
          setPageFeedback('Task updated successfully.', 'success');
        } else {
          task = await request('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(payload),
          });
          setPageFeedback('Task created successfully.', 'success');
        }

        const existingIndex = tasks.findIndex((item) => item.id === task.id);
        if (existingIndex >= 0) {
          tasks.splice(existingIndex, 1, task);
        } else {
          tasks.unshift(task);
        }

        closeModal();
        await loadData();
      } catch (error) {
        if (error.status === 401) {
          clearToken();
          redirect('/login');
          return;
        }

        setFormFeedback(error.message || 'Unable to save task', 'error');
      } finally {
        setBusy(form, false);
      }
    }

    async function deleteTask(taskId) {
      const task = findTaskById(taskId);
      const confirmed = await showConfirmModal({
        title: 'Delete task',
        message: `Are you sure you want to delete ${task ? `"${task.title}"` : 'this task'}?`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        destructive: true,
      });

      if (!confirmed) {
        return;
      }

      try {
        await request(`/api/tasks/${taskId}`, {
          method: 'DELETE',
        });

        tasks = tasks.filter((item) => item.id !== taskId);
        setPageFeedback('Task deleted successfully.', 'success');
        refreshView();
      } catch (error) {
        if (error.status === 401) {
          clearToken();
          redirect('/login');
          return;
        }

        setPageFeedback(error.message || 'Unable to delete task', 'error');
      }
    }

    function renderStats(list) {
      updateStats(list);
    }

    if (clientFilter) {
      clientFilter.addEventListener('change', () => {
        currentClientFilter = clientFilter.value;
        refreshView();
      });
    }

    if (userFilter) {
      userFilter.addEventListener('change', () => {
        currentUserFilter = userFilter.value;
        refreshView();
      });
    }

    if (resetFiltersButton) {
      resetFiltersButton.addEventListener('click', () => {
        currentClientFilter = '';
        currentUserFilter = '';
        if (clientFilter) {
          clientFilter.value = '';
        }
        if (userFilter) {
          userFilter.value = '';
        }
        refreshView();
      });
    }

    openButton.addEventListener('click', () => openModal(null));

    closeButtons.forEach((button) => {
      button.addEventListener('click', closeModal);
    });

    if (cancelButton) {
      cancelButton.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
          closeModal();
        }
      });
    } else {
      modal.addEventListener('click', (event) => {
        if (event.target === modal) {
          closeModal();
        }
      });
    }

    table.addEventListener('click', (event) => {
      const toggleButton = event.target.closest('[data-task-label-toggle]');
      if (toggleButton) {
        const taskId = Number.parseInt(toggleButton.dataset.taskLabelToggle || '', 10);
        if (!Number.isNaN(taskId)) {
          if (openTaskLabelTaskId === taskId) {
            closeTaskLabelOverlay();
          } else {
            openTaskLabelOverlay(taskId, toggleButton);
          }
        }
        return;
      }

      const actionButton = event.target.closest('[data-task-action]');
      if (!actionButton) {
        return;
      }

      const taskId = Number.parseInt(actionButton.dataset.taskId || '', 10);
      if (Number.isNaN(taskId)) {
        return;
      }

      const task = findTaskById(taskId);
      const action = actionButton.dataset.taskAction;

      if (action === 'edit' && task) {
        openModal(task);
      }

      if (action === 'delete') {
        void deleteTask(taskId);
      }
    });

    document.addEventListener('click', (event) => {
      if (event.target.closest('.task-label-overlay') || event.target.closest('[data-task-label-toggle]')) {
        return;
      }

      closeTaskLabelOverlay();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeTaskLabelOverlay();
      }
    });

    window.addEventListener('resize', () => {
      refreshTaskLabelOverlayPosition();
    });

    window.addEventListener('scroll', () => {
      refreshTaskLabelOverlayPosition();
    }, true);

    window.addEventListener('popstate', () => {
      closeTaskLabelOverlay();
    });

    form.addEventListener('submit', submitForm);

    await loadData();
  }

  async function initAuthenticatedShell() {
    const chips = document.querySelectorAll('.sidebar-footer .profile-chip');

    if (chips.length === 0) {
      return;
    }

    try {
      const profile = await request('/users/me');

      chips.forEach((chip) => fillProfileChip(chip, profile));
    } catch (error) {
      if (error.status === 401) {
        clearToken();
        redirect('/login');
        return;
      }

      console.error('Unable to load profile chip data', error);
    }
  }

  async function initProfilePage() {
    const form = document.querySelector('[data-profile-form]');
    const feedback = document.querySelector('[data-profile-feedback]');
    const logoutButton = document.querySelector('[data-logout-button]');

    if (!form) return;

    try {
      const profile = await request('/users/me');
      populateProfile(profile);
    } catch (error) {
      clearToken();
      redirect('/login');
      return;
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      setFeedback(feedback, '', '');

      if (!form.reportValidity()) {
        return;
      }

      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();

      if (!name && !email) {
        setFeedback(feedback, 'Add at least one field to update your profile.', 'error');
        return;
      }

      setBusy(form, true);
      try {
        const updated = await request('/users/me', {
          method: 'PATCH',
          body: JSON.stringify({ name, email }),
        });

        populateProfile(updated);
        setFeedback(feedback, 'Profile updated successfully.', 'success');
      } catch (error) {
        if (error.status === 401) {
          clearToken();
          redirect('/login');
          return;
        }

        setFeedback(feedback, error.message || 'Unable to update profile', 'error');
      } finally {
        setBusy(form, false);
      }
    });

    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        clearToken();
        redirect('/login');
      });
    }
  }

  async function initSettingsPage() {
    const labelList = document.querySelector('[data-settings-label-list]');
    const labelFeedback = document.querySelector('[data-settings-label-feedback]');
    const createRow = document.querySelector('[data-settings-label-create-row]');
    const createInput = document.querySelector('[data-settings-label-input]');
    const createButton = document.querySelector('[data-settings-label-create]');

    if (!labelList || !labelFeedback || !createRow) {
      return;
    }

    const privilegedRoles = new Set(['ADMIN', 'MANAGER']);

    let currentUser = null;
    let taskLabels = [];

    function isPrivileged() {
      return Boolean(currentUser && privilegedRoles.has(currentUser.role));
    }

    function setLabelFeedback(message, tone) {
      setFeedback(labelFeedback, message, tone);
    }

    function renderLabelList() {
      const canEdit = isPrivileged();
      const labels = taskLabels;

      createRow.hidden = !canEdit;

      if (labels.length === 0) {
        labelList.innerHTML = `
          <div class="empty-shell empty-shell-inline">
            <div>
              <strong>No labels yet</strong>
              <p>${canEdit ? 'Add the first label to the global catalog.' : 'Only admins and managers can manage labels.'}</p>
            </div>
          </div>
        `;
        return;
      }

      labelList.innerHTML = `
        <div class="settings-label-items">
          ${labels
            .map(
              (label) => `
                <div class="settings-label-item">
                  <span class="task-label-chip">${escapeHtml(label.name)}</span>
                  ${canEdit ? `<button type="button" class="client-action client-action-archive settings-label-delete" data-settings-label-delete="${label.id}">Delete</button>` : ''}
                </div>
              `,
            )
            .join('')}
        </div>
      `;
    }

    function normalizeLabelName(value) {
      return String(value || '').trim().replace(/\s+/g, ' ');
    }

    function buildLabelCatalog(list) {
      const seen = new Set();
      const labels = [];

      list.forEach((label) => {
        const name = normalizeLabelName(label?.name);
        if (!name) {
          return;
        }

        const key = name.toLowerCase();
        if (seen.has(key)) {
          return;
        }

        seen.add(key);
        labels.push({ ...label, name });
      });

      labels.sort((left, right) => left.name.localeCompare(right.name));
      return labels;
    }

    async function loadSettingsData() {
      try {
        const [profile, labels] = await Promise.all([
          request('/users/me'),
          request('/api/task-labels'),
        ]);

        currentUser = profile;
        taskLabels = buildLabelCatalog(Array.isArray(labels) ? labels : []);

        renderLabelList();
        setLabelFeedback('', '');
      } catch (error) {
        if (error.status === 401) {
          clearToken();
          redirect('/login');
          return;
        }

        setLabelFeedback(error.message || 'Unable to load settings', 'error');
      }
    }

    async function createLabel() {
      if (!isPrivileged()) {
        setLabelFeedback('Only admins and managers can manage labels.', 'error');
        return;
      }

      const normalizedName = normalizeLabelName(createInput?.value || '');

      if (!normalizedName) {
        setLabelFeedback('Label name is required.', 'error');
        return;
      }

      createButton && (createButton.disabled = true);
      try {
        await request('/api/task-labels', {
          method: 'POST',
          body: JSON.stringify({
            name: normalizedName,
          }),
        });

        if (createInput) {
          createInput.value = '';
        }

        setLabelFeedback('Label created successfully.', 'success');
        await loadSettingsData();
      } catch (error) {
        if (error.status === 401) {
          clearToken();
          redirect('/login');
          return;
        }

        setLabelFeedback(error.message || 'Unable to create label', 'error');
      } finally {
        if (createButton) {
          createButton.disabled = false;
        }
      }
    }

    async function deleteLabel(labelId) {
      if (!isPrivileged()) {
        setLabelFeedback('Only admins and managers can manage labels.', 'error');
        return;
      }

      const label = taskLabels.find((item) => item.id === labelId);
      const confirmed = await showConfirmModal({
        title: 'Delete label',
        message: `Delete ${label ? `"${label.name}"` : 'this label'}? It will be removed from all tasks that use it.`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        destructive: true,
      });

      if (!confirmed) {
        return;
      }

      try {
        await request(`/api/task-labels/${labelId}`, {
          method: 'DELETE',
        });

        setLabelFeedback('Label deleted successfully.', 'success');
        await loadSettingsData();
      } catch (error) {
        if (error.status === 401) {
          clearToken();
          redirect('/login');
          return;
        }

        setLabelFeedback(error.message || 'Unable to delete label', 'error');
      }
    }

    if (createButton) {
      createButton.addEventListener('click', () => {
        void createLabel();
      });
    }

    if (createInput) {
      createInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          void createLabel();
        }
      });
    }

    labelList.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('[data-settings-label-delete]');
      if (!deleteButton) {
        return;
      }

      const labelId = Number.parseInt(deleteButton.dataset.settingsLabelDelete || '', 10);
      if (!Number.isNaN(labelId)) {
        void deleteLabel(labelId);
      }
    });

    await loadSettingsData();
  }

  if (!setupAuthGate()) {
    syncSidebarNavigation();
    void initAuthenticatedShell();

    const page = document.body.dataset.page;
    if (page === 'login') void initLoginPage();
    if (page === 'register') void initRegisterPage();
    if (page === 'profile') void initProfilePage();
    if (page === 'clients') void initClientPage();
    if (page === 'tasks') void initTaskPage();
    if (page === 'settings') void initSettingsPage();
  }
})();
