import { useEffect, useState } from 'react';
import { changePassword, fetchCurrentUser, updateProfile } from '../lib/api';
import type { SafeUser } from '../types';

const formatDate = (value?: string): string => {
  if (!value) {
    return '--';
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
};

export function ProfilePage() {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetchCurrentUser();
        if (!cancelled) {
          setUser(response);
          setName(response.name);
          setEmail(response.email);
          setMessage('');
          setError('');
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load profile');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="route-main team-profile-page">
      <header className="topbar dashboard-topbar">
        <h1>Profile</h1>
        <div className="topbar-actions">
          <a className="action-button" href="/clients">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m-7-7h14" /></svg>
            <span>Manage Clients</span>
          </a>
          <button className="team-switcher" type="button" aria-label="Workspace selector">
            <span>Acme Team</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
          </button>
        </div>
      </header>

      {message ? <div className="feedback" data-tone="success" aria-live="polite">{message}</div> : null}
      {error ? <div className="feedback" data-tone="error" aria-live="polite">{error}</div> : null}

      {isLoading ? <div className="empty-state">Loading profile...</div> : null}

      {!isLoading ? (
        <>
          <section className="route-hero">
            <article className="card-panel route-hero-copy profile-hero-panel">
              <p className="route-eyebrow">Account</p>
              <h2 className="route-title">{user?.name || 'Profile'}</h2>
              <p className="route-copy">{user?.email || email}</p>

              <div className="profile-summary profile-summary-inline">
                <div className="summary-item">
                  <span>Created</span>
                  <strong>{formatDate(user?.createdAt)}</strong>
                </div>
                <div className="summary-item">
                  <span>Last updated</span>
                  <strong>{formatDate(user?.updatedAt)}</strong>
                </div>
              </div>
            </article>

            <aside className="route-metrics">
              <div className="route-metric">
                <span>Profile status</span>
                <strong>{user?.isActive ? 'JWT protected' : 'Inactive'}</strong>
              </div>
              <div className="route-metric">
                <span>Account email</span>
                <strong>{user?.email || email}</strong>
              </div>
              <div className="route-metric">
                <span>System role</span>
                <strong>{user?.systemRole || 'member'}</strong>
              </div>
            </aside>
          </section>

          <section className="route-grid">
            <article className="profile-card">
              <div className="toolbar">
                <h2>Update profile</h2>
                <span className="notice">JWT protected</span>
              </div>

              <div className="divider"></div>

              <form
                className="profile-form"
                onSubmit={async (event) => {
                  event.preventDefault();
                  try {
                    const updated = await updateProfile({ name, email });
                    setUser(updated);
                    setName(updated.name);
                    setEmail(updated.email);
                    setMessage('Saved');
                    setError('');
                  } catch (updateError) {
                    setError(updateError instanceof Error ? updateError.message : 'Unable to save profile');
                    setMessage('');
                  }
                }}
              >
                <div className="field">
                  <label htmlFor="profile-name">Name</label>
                  <input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} />
                </div>

                <div className="field">
                  <label htmlFor="profile-email">Email</label>
                  <input id="profile-email" value={email} onChange={(event) => setEmail(event.target.value)} required type="email" maxLength={255} />
                </div>

                <div className="form-actions">
                  <button className="btn btn-primary" type="submit">Save changes</button>
                  <button className="btn btn-secondary" type="button" onClick={() => { window.localStorage.removeItem('sttt_access_token'); window.location.href = '/login'; }}>
                    Logout
                  </button>
                </div>
              </form>
            </article>

            <article className="profile-card">
              <div className="toolbar">
                <h2>Change password</h2>
              </div>

              <div className="divider"></div>

              <form
                className="profile-form"
                onSubmit={async (event) => {
                  event.preventDefault();
                  try {
                    await changePassword({ currentPassword, newPassword, confirmPassword });
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setMessage('Password updated');
                    setError('');
                  } catch (passwordError) {
                    setError(passwordError instanceof Error ? passwordError.message : 'Unable to update password');
                    setMessage('');
                  }
                }}
              >
                <div className="field">
                  <label htmlFor="current-password">Current Password</label>
                  <input id="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required type="password" />
                </div>

                <div className="field">
                  <label htmlFor="new-password">New Password</label>
                  <input id="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required type="password" minLength={8} />
                </div>

                <div className="field">
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input id="confirm-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required type="password" minLength={8} />
                </div>

                <div className="form-actions">
                  <button className="btn btn-primary" type="submit">Update password</button>
                </div>
              </form>
            </article>
          </section>
        </>
      ) : null}
    </section>
  );
}
