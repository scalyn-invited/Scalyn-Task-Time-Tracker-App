(function () {
  const TOKEN_KEY = 'sttt_access_token';
  const DEFAULT_VIEW = 'weekly';

  const state = {
    view: DEFAULT_VIEW,
    users: [],
    clients: [],
    tasks: [],
    groups: [],
    rows: [],
    totals: {
      durationSeconds: 0,
      entryCount: 0,
    },
    range: {
      from: '',
      to: '',
      label: '',
    },
    filters: {
      userId: '',
      clientId: '',
      taskId: '',
      from: '',
      to: '',
    },
    dataTable: null,
    selectedEntry: null,
    previousFocus: null,
    modals: null,
  };

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  function redirect(path) {
    window.location.assign(path);
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

  function formatDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(value));
  }

  function formatDateTime(value) {
    if (!value) {
      return '--';
    }

    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(value));
  }

  function toDateInputValue(value) {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function toTimeInputValue(value) {
    const date = new Date(value);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  function combineDateTime(dateValue, timeValue) {
    if (!dateValue || !timeValue) {
      return '';
    }

    return new Date(`${dateValue}T${timeValue}:00`).toISOString();
  }

  function getDefaultRange(view) {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (view === 'daily') {
      const end = new Date(startOfDay);
      end.setHours(23, 59, 59, 999);
      return { from: toDateInputValue(startOfDay), to: toDateInputValue(end) };
    }

    if (view === 'monthly') {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { from: toDateInputValue(start), to: toDateInputValue(end) };
    }

    const weekStart = new Date(startOfDay);
    weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    return { from: toDateInputValue(weekStart), to: toDateInputValue(weekEnd) };
  }

  function getErrorMessage(payload, fallback) {
    if (!payload || typeof payload !== 'object') {
      return fallback;
    }

    const message = payload.message;

    if (typeof message === 'string') {
      return message;
    }

    if (Array.isArray(message) && typeof message[0] === 'string') {
      return message[0];
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

    const response = await fetch(path, {
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

      if (response.status === 401) {
        clearToken();
        redirect('/login');
      }

      throw error;
    }

    return payload;
  }

  function setText(selector, value) {
    const node = document.querySelector(selector);
    if (node) {
      node.textContent = value;
    }
  }

  function destroyDataTable() {
    if (state.dataTable) {
      state.dataTable.destroy();
      state.dataTable = null;
    }
  }

  function buildQuery() {
    const search = new URLSearchParams();
    search.set('view', state.view);

    if (state.filters.userId) {
      search.set('userId', state.filters.userId);
    }

    if (state.filters.clientId) {
      search.set('clientId', state.filters.clientId);
    }

    if (state.filters.taskId) {
      search.set('taskId', state.filters.taskId);
    }

    if (state.filters.from) {
      search.set('from', state.filters.from);
    }

    if (state.filters.to) {
      search.set('to', state.filters.to);
    }

    return search.toString();
  }

  function flattenGroups(groups) {
    return groups.flatMap((group) => group.entries);
  }

  function getUserName(userId) {
    const match = state.users.find((user) => user.id === Number(userId));
    return match ? match.name : 'All users';
  }

  function getClientName(clientId) {
    const match = state.clients.find((client) => client.id === Number(clientId));
    return match ? match.name : 'All clients';
  }

  function getTaskName(taskId) {
    const match = state.tasks.find((task) => task.id === Number(taskId));
    return match ? match.title : 'All tasks';
  }

  function renderSelectOptions() {
    const userSelect = document.querySelector('[data-timesheet-user-filter]');
    const clientSelect = document.querySelector('[data-timesheet-client-filter]');
    const taskSelect = document.querySelector('[data-timesheet-task-filter]');

    if (userSelect) {
      userSelect.innerHTML = [
        '<option value="">All users</option>',
        ...state.users.map((user) => `<option value="${user.id}">${escapeHtml(user.name)}</option>`),
      ].join('');
      userSelect.value = state.filters.userId;
    }

    if (clientSelect) {
      clientSelect.innerHTML = [
        '<option value="">All clients</option>',
        ...state.clients.map((client) => `<option value="${client.id}">${escapeHtml(client.name)}</option>`),
      ].join('');
      clientSelect.value = state.filters.clientId;
    }

    if (taskSelect) {
      const selectedClientId = state.filters.clientId ? Number(state.filters.clientId) : null;
      const filteredTasks = selectedClientId
        ? state.tasks.filter((task) => task.clientId === selectedClientId)
        : state.tasks;

      taskSelect.innerHTML = [
        '<option value="">All tasks</option>',
        ...filteredTasks.map((task) => `<option value="${task.id}">${escapeHtml(task.title)}</option>`),
      ].join('');

      const stillAvailable = filteredTasks.some((task) => String(task.id) === state.filters.taskId);
      taskSelect.value = stillAvailable ? state.filters.taskId : '';

      if (!stillAvailable) {
        state.filters.taskId = '';
      }
    }
  }

  function renderViewButtons() {
    const buttons = document.querySelectorAll('[data-timesheet-view]');
    buttons.forEach((button) => {
      const active = button.dataset.timesheetView === state.view;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function renderSummary() {
    setText('[data-timesheet-total-duration]', formatDuration(state.totals.durationSeconds));
    setText('[data-timesheet-entry-count]', String(state.totals.entryCount));
    setText('[data-timesheet-range-label]', state.range.label || 'Select a range');
    setText('[data-timesheet-current-user]', getUserName(state.filters.userId || ''));
    setText('[data-timesheet-current-client]', getClientName(state.filters.clientId || ''));
    setText('[data-timesheet-current-task]', getTaskName(state.filters.taskId || ''));
  }

  function renderGroupCards() {
    const container = document.querySelector('[data-timesheet-groups]');
    if (!container) {
      return;
    }

    if (state.groups.length === 0) {
      container.innerHTML = '<div class="empty-shell empty-shell-inline"><div><strong>No time entries found</strong></div></div>';
      return;
    }

    container.innerHTML = state.groups
      .map(
        (group) => `
          <article class="timesheet-group-card">
            <div class="timesheet-group-head">
              <div>
                <strong>${escapeHtml(group.label)}</strong>
                <span>${group.entryCount} entries</span>
              </div>
              <div class="timesheet-group-total">${formatDuration(group.totalDurationSeconds)}</div>
            </div>
          </article>
        `,
      )
      .join('');
  }

  function renderTableRows() {
    const tbody = document.querySelector('[data-timesheet-table-body]');
    if (!tbody) {
      return;
    }

    const rows = flattenGroups(state.groups);
    tbody.innerHTML = rows
      .map(
        (entry) => `
          <tr data-entry-id="${entry.id}">
            <td>${escapeHtml(formatDate(entry.startTime))}</td>
            <td>
              <div class="timesheet-primary-cell">
                <strong>${escapeHtml(entry.task.title)}</strong>
                <span>#${entry.task.id}</span>
              </div>
            </td>
            <td>${escapeHtml(entry.client.name)}</td>
            <td>${formatDuration(entry.durationSeconds)}</td>
            <td>${entry.description ? escapeHtml(entry.description) : '<span class="timesheet-empty-cell">-</span>'}</td>
            <td>
              <div class="table-actions timesheet-table-actions">
                <button type="button" class="task-icon-action" title="View" aria-label="View time entry" data-action="view" data-entry-id="${entry.id}">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
                <button type="button" class="task-icon-action" title="Edit" aria-label="Edit time entry" data-action="edit" data-entry-id="${entry.id}">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </button>
                <button type="button" class="task-icon-action task-icon-action-danger" title="Delete" aria-label="Delete time entry" data-action="delete" data-entry-id="${entry.id}">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 6h18" />
                    <path d="M8 6V4h8v2" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        `,
      )
      .join('');

    destroyDataTable();

    const DataTableClass = window.DataTable;
    if (typeof DataTableClass === 'function') {
      state.dataTable = new DataTableClass(tbody.closest('table'), {
        paging: true,
        searching: true,
        info: true,
        pageLength: 10,
        order: [[0, 'desc']],
        language: {
          searchPlaceholder: 'Search time entries',
        },
      });
    }
  }

  function syncDateInputs() {
    const fromInput = document.querySelector('[data-timesheet-from]');
    const toInput = document.querySelector('[data-timesheet-to]');

    if (fromInput) {
      fromInput.value = state.filters.from;
    }

    if (toInput) {
      toInput.value = state.filters.to;
    }
  }

  function setView(view) {
    state.view = view;
    const range = getDefaultRange(view);
    state.filters.from = range.from;
    state.filters.to = range.to;
    renderViewButtons();
    syncDateInputs();
  }

  function normalizeFiltersFromForm() {
    const userSelect = document.querySelector('[data-timesheet-user-filter]');
    const clientSelect = document.querySelector('[data-timesheet-client-filter]');
    const taskSelect = document.querySelector('[data-timesheet-task-filter]');
    const fromInput = document.querySelector('[data-timesheet-from]');
    const toInput = document.querySelector('[data-timesheet-to]');

    state.filters.userId = userSelect ? String(userSelect.value || '') : '';
    state.filters.clientId = clientSelect ? String(clientSelect.value || '') : '';
    state.filters.taskId = taskSelect ? String(taskSelect.value || '') : '';
    state.filters.from = fromInput ? String(fromInput.value || '') : '';
    state.filters.to = toInput ? String(toInput.value || '') : '';
  }

  function ensureModals() {
    if (state.modals) {
      return state.modals;
    }

    const createModalShell = window.STTTModal && window.STTTModal.createModalShell;
    if (typeof createModalShell !== 'function') {
      throw new Error('Modal helper not available');
    }

    const view = createModalShell({
      rootClassName: 'modal-backdrop timesheet-modal',
      panelClassName: 'modal-card timesheet-modal-card timesheet-view-card',
      titleId: 'timesheet-view-title',
      bodyClassName: 'timesheet-modal-open',
    });
    view.setBodyHtml(`
      <header class="modal-header timesheet-modal-header">
        <div>
          <h2 id="timesheet-view-title" data-modal-title>Time entry</h2>
        </div>
        <button type="button" class="modal-close-button" data-timesheet-view-close aria-label="Close view dialog">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>
      <div class="timesheet-view-details" data-timesheet-view-details></div>
    `);

    const edit = createModalShell({
      rootClassName: 'modal-backdrop timesheet-modal',
      panelClassName: 'modal-card timesheet-modal-card timesheet-edit-card',
      titleId: 'timesheet-edit-title',
      bodyClassName: 'timesheet-modal-open',
    });
    edit.setBodyHtml(`
      <header class="modal-header timesheet-modal-header">
        <div>
          <h2 id="timesheet-edit-title" data-modal-title>Edit time entry</h2>
        </div>
        <button type="button" class="modal-close-button" data-timesheet-edit-close aria-label="Close edit dialog">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>
      <form class="timesheet-edit-form" data-timesheet-edit-form>
        <div class="timesheet-form-grid">
          <label class="field">
            <span>Client</span>
            <select data-timesheet-edit-client></select>
          </label>
          <label class="field">
            <span>Task</span>
            <select data-timesheet-edit-task></select>
          </label>
          <label class="field">
            <span>Start date</span>
            <input type="date" data-timesheet-edit-start-date />
          </label>
          <label class="field">
            <span>Start time</span>
            <input type="time" data-timesheet-edit-start-time />
          </label>
          <label class="field">
            <span>End date</span>
            <input type="date" data-timesheet-edit-end-date />
          </label>
          <label class="field">
            <span>End time</span>
            <input type="time" data-timesheet-edit-end-time />
          </label>
          <label class="field timesheet-form-wide">
            <span>Description</span>
            <textarea rows="4" data-timesheet-edit-description></textarea>
          </label>
        </div>
        <div class="modal-footer">
          <button type="button" class="team-switcher" data-timesheet-edit-cancel>Cancel</button>
          <button type="submit" class="action-button">Save changes</button>
        </div>
      </form>
    `);

    const confirm = createModalShell({
      rootClassName: 'confirm-modal',
      surfaceClassName: 'confirm-modal-overlay',
      panelClassName: 'confirm-modal-dialog',
      titleId: 'timesheet-confirm-title',
      descriptionId: 'timesheet-confirm-message',
      bodyClassName: 'confirm-modal-open',
      onClose: () => {
        if (modals && typeof modals.confirmResolver === 'function') {
          const resolve = modals.confirmResolver;
          modals.confirmResolver = null;
          resolve(false);
        }
      },
    });
    confirm.setBodyHtml(`
      <header class="confirm-modal-header">
        <div>
          <p class="confirm-modal-eyebrow">Confirm action</p>
          <h2 id="timesheet-confirm-title" data-modal-title>Delete time entry</h2>
        </div>
        <button class="modal-close-button confirm-modal-close" type="button" data-timesheet-confirm-close aria-label="Close confirmation dialog">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>
      <div class="confirm-modal-body">
        <div id="timesheet-confirm-message" class="confirm-modal-message" data-timesheet-confirm-message data-modal-description></div>
        <div class="confirm-modal-actions">
          <button class="confirm-modal-button is-secondary" type="button" data-timesheet-confirm-cancel>Cancel</button>
          <button class="confirm-modal-button is-primary is-destructive" type="button" data-timesheet-confirm-submit data-modal-default-focus>Delete</button>
        </div>
      </div>
    `);

    const modals = {
      viewModal: view.modal,
      viewDetails: view.modal.querySelector('[data-timesheet-view-details]'),
      viewClose: view.modal.querySelector('[data-timesheet-view-close]'),
      editModal: edit.modal,
      editForm: edit.modal.querySelector('[data-timesheet-edit-form]'),
      editClose: edit.modal.querySelector('[data-timesheet-edit-close]'),
      editCancel: edit.modal.querySelector('[data-timesheet-edit-cancel]'),
      editClient: edit.modal.querySelector('[data-timesheet-edit-client]'),
      editTask: edit.modal.querySelector('[data-timesheet-edit-task]'),
      editStartDate: edit.modal.querySelector('[data-timesheet-edit-start-date]'),
      editStartTime: edit.modal.querySelector('[data-timesheet-edit-start-time]'),
      editEndDate: edit.modal.querySelector('[data-timesheet-edit-end-date]'),
      editEndTime: edit.modal.querySelector('[data-timesheet-edit-end-time]'),
      editDescription: edit.modal.querySelector('[data-timesheet-edit-description]'),
      confirmModal: confirm.modal,
      confirmMessage: confirm.modal.querySelector('[data-timesheet-confirm-message]'),
      confirmClose: confirm.modal.querySelector('[data-timesheet-confirm-close]'),
      confirmCancel: confirm.modal.querySelector('[data-timesheet-confirm-cancel]'),
      confirmSubmit: confirm.modal.querySelector('[data-timesheet-confirm-submit]'),
      confirmResolver: null,
      viewShell: view,
      editShell: edit,
      confirmShell: confirm,
    };

    modals.viewClose.addEventListener('click', () => {
      modals.viewShell.closeModal();
      state.selectedEntry = null;
    });
    modals.editClose.addEventListener('click', () => {
      modals.editShell.closeModal();
      state.selectedEntry = null;
    });
    modals.editCancel.addEventListener('click', () => {
      modals.editShell.closeModal();
      state.selectedEntry = null;
    });
    modals.confirmClose.addEventListener('click', () => closeConfirmModal(false));
    modals.confirmCancel.addEventListener('click', () => closeConfirmModal(false));
    modals.confirmSubmit.addEventListener('click', () => closeConfirmModal(true));

    modals.editClient.addEventListener('change', () => {
      const clientId = Number(modals.editClient.value);
      const filteredTasks = state.tasks.filter((task) => task.clientId === clientId);
      modals.editTask.innerHTML = filteredTasks
        .map((task) => `<option value="${task.id}">${escapeHtml(task.title)}</option>`)
        .join('');
    });

    modals.editForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!state.selectedEntry) {
        return;
      }

      const clientId = Number(modals.editClient.value);
      const taskId = Number(modals.editTask.value);
      const startTime = combineDateTime(modals.editStartDate.value, modals.editStartTime.value);
      const endTime = combineDateTime(modals.editEndDate.value, modals.editEndTime.value);
      const description = String(modals.editDescription.value || '').trim();

      if (!clientId || !taskId || !startTime || !endTime) {
        return;
      }

      if (new Date(endTime).getTime() < new Date(startTime).getTime()) {
        return;
      }

      await request(`/time-entries/${state.selectedEntry.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          clientId,
          taskId,
          startTime,
          endTime,
          description,
        }),
      });

      modals.editShell.closeModal();
      state.selectedEntry = null;
      await loadTimesheet();
    });

    state.modals = modals;
    return modals;
  }

  function closeConfirmModal(confirmed) {
    const modals = ensureModals();

    if (typeof modals.confirmResolver === 'function') {
      const resolver = modals.confirmResolver;
      modals.confirmResolver = null;
      modals.confirmShell.closeModal();
      resolver(confirmed);
    }
  }

  function showConfirmModal(message) {
    const modals = ensureModals();

    if (typeof modals.confirmResolver === 'function') {
      closeConfirmModal(false);
    }

    modals.confirmMessage.textContent = message;
    modals.confirmShell.openModal('[data-timesheet-confirm-submit]');

    return new Promise((resolve) => {
      modals.confirmResolver = resolve;
    });
  }

  function openViewModal(entry) {
    const modals = ensureModals();
    modals.viewDetails.innerHTML = `
      <dl class="timesheet-detail-list">
        <div><dt>Date</dt><dd>${escapeHtml(formatDate(entry.startTime))}</dd></div>
        <div><dt>Task</dt><dd>${escapeHtml(entry.task.title)}</dd></div>
        <div><dt>Client</dt><dd>${escapeHtml(entry.client.name)}</dd></div>
        <div><dt>Duration</dt><dd>${formatDuration(entry.durationSeconds)}</dd></div>
        <div><dt>Start</dt><dd>${formatDateTime(entry.startTime)}</dd></div>
        <div><dt>End</dt><dd>${formatDateTime(entry.endTime)}</dd></div>
        <div class="timesheet-detail-wide"><dt>Description</dt><dd>${escapeHtml(entry.description || '-')}</dd></div>
      </dl>
    `;
    modals.viewShell.openModal('[data-timesheet-view-close]');
  }

  function openEditModal(entry) {
    const modals = ensureModals();
    state.selectedEntry = entry;

    modals.editClient.innerHTML = state.clients
      .map((client) => `<option value="${client.id}"${String(client.id) === String(entry.clientId) ? ' selected' : ''}>${escapeHtml(client.name)}</option>`)
      .join('');

    const filteredTasks = state.tasks.filter((task) => task.clientId === entry.clientId);
    modals.editTask.innerHTML = filteredTasks
      .map((task) => `<option value="${task.id}"${String(task.id) === String(entry.taskId) ? ' selected' : ''}>${escapeHtml(task.title)}</option>`)
      .join('');

    const startDate = toDateInputValue(entry.startTime);
    const startTime = toTimeInputValue(entry.startTime);
    const endDate = entry.endTime ? toDateInputValue(entry.endTime) : startDate;
    const endTime = entry.endTime ? toTimeInputValue(entry.endTime) : startTime;

    modals.editStartDate.value = startDate;
    modals.editStartTime.value = startTime;
    modals.editEndDate.value = endDate;
    modals.editEndTime.value = endTime;
    modals.editDescription.value = entry.description || '';

    modals.editShell.openModal('[data-timesheet-edit-client]');
  }

  function closeAllModals() {
    const modals = ensureModals();
    modals.viewShell.closeModal();
    modals.editShell.closeModal();
    closeConfirmModal(false);
    state.selectedEntry = null;
  }

  async function loadBootstrapData() {
    const [users, activeClients, archivedClients, tasks] = await Promise.all([
      request('/users'),
      request('/api/clients'),
      request('/api/clients/archived'),
      request('/api/tasks'),
    ]);

    const clientMap = new Map();
    [...(Array.isArray(activeClients) ? activeClients : []), ...(Array.isArray(archivedClients) ? archivedClients : [])].forEach((client) => {
      if (!clientMap.has(client.id)) {
        clientMap.set(client.id, client);
      }
    });

    state.users = Array.isArray(users) ? users : [];
    state.clients = [...clientMap.values()].sort((left, right) => left.name.localeCompare(right.name));
    state.tasks = Array.isArray(tasks) ? tasks.sort((left, right) => left.title.localeCompare(right.title)) : [];
    renderSelectOptions();
  }

  async function loadTimesheet() {
    const feedback = document.querySelector('[data-timesheet-feedback]');
    const refreshButton = document.querySelector('[data-timesheet-refresh]');

    try {
      if (feedback) {
        feedback.textContent = '';
      }

      if (refreshButton) {
        refreshButton.disabled = true;
      }

      const payload = await request(`/time-entries?${buildQuery()}`);
      state.view = payload.view || state.view;
      state.groups = Array.isArray(payload.groups) ? payload.groups : [];
      state.totals = payload.totals || { durationSeconds: 0, entryCount: 0 };
      state.range = payload.range || { from: '', to: '', label: '' };
      state.rows = flattenGroups(state.groups);

      renderViewButtons();
      renderSummary();
      renderGroupCards();
      renderTableRows();
      syncDateInputs();
    } catch (error) {
      if (feedback) {
        feedback.textContent = error.message || 'Unable to load timesheets';
      }
    } finally {
      if (refreshButton) {
        refreshButton.disabled = false;
      }
    }
  }

  function attachEvents() {
    const viewButtons = document.querySelectorAll('[data-timesheet-view]');
    const refreshButton = document.querySelector('[data-timesheet-refresh]');
    const resetButton = document.querySelector('[data-timesheet-reset]');
    const userSelect = document.querySelector('[data-timesheet-user-filter]');
    const clientSelect = document.querySelector('[data-timesheet-client-filter]');
    const taskSelect = document.querySelector('[data-timesheet-task-filter]');
    const fromInput = document.querySelector('[data-timesheet-from]');
    const toInput = document.querySelector('[data-timesheet-to]');
    const table = document.querySelector('#timesheet-table');
    const modals = ensureModals();

    viewButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        setView(button.dataset.timesheetView);
        renderSelectOptions();
        await loadTimesheet();
      });
    });

    if (refreshButton) {
      refreshButton.addEventListener('click', () => {
        void loadTimesheet();
      });
    }

    if (resetButton) {
      resetButton.addEventListener('click', async () => {
        state.filters.userId = '';
        state.filters.clientId = '';
        state.filters.taskId = '';
        setView(DEFAULT_VIEW);
        renderSelectOptions();
        await loadTimesheet();
      });
    }

    if (userSelect) {
      userSelect.addEventListener('change', async () => {
        state.filters.userId = String(userSelect.value || '');
        await loadTimesheet();
      });
    }

    if (clientSelect) {
      clientSelect.addEventListener('change', async () => {
        state.filters.clientId = String(clientSelect.value || '');
        renderSelectOptions();
        await loadTimesheet();
      });
    }

    if (taskSelect) {
      taskSelect.addEventListener('change', async () => {
        state.filters.taskId = String(taskSelect.value || '');
        await loadTimesheet();
      });
    }

    if (fromInput) {
      fromInput.addEventListener('change', async () => {
        state.filters.from = String(fromInput.value || '');
        await loadTimesheet();
      });
    }

    if (toInput) {
      toInput.addEventListener('change', async () => {
        state.filters.to = String(toInput.value || '');
        await loadTimesheet();
      });
    }

    if (table) {
      table.addEventListener('click', async (event) => {
        const button = event.target.closest('[data-action]');
        if (!button) {
          return;
        }

        const entryId = Number(button.dataset.entryId);
        if (!entryId) {
          return;
        }

        const entry = state.rows.find((item) => item.id === entryId);
        if (!entry) {
          return;
        }

        if (button.dataset.action === 'view') {
          openViewModal(entry);
          return;
        }

        if (button.dataset.action === 'edit') {
          openEditModal(entry);
          return;
        }

        if (button.dataset.action === 'delete') {
          const confirmed = await showConfirmModal(`Delete "${entry.task.title}"? This action cannot be undone.`);
          if (!confirmed) {
            return;
          }

          await request(`/time-entries/${entry.id}`, {
            method: 'DELETE',
          });

          await loadTimesheet();
        }
      });
    }

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeAllModals();
      }
    });
  }

  async function init() {
    if (!getToken()) {
      clearToken();
      redirect('/login');
      return;
    }

    setView(DEFAULT_VIEW);
    ensureModals();
    renderViewButtons();
    syncDateInputs();
    attachEvents();

    try {
      await loadBootstrapData();
      await loadTimesheet();
    } catch (error) {
      const feedback = document.querySelector('[data-timesheet-feedback]');
      if (feedback) {
        feedback.textContent = error.message || 'Unable to load timesheets';
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    void init();
  }
})();
