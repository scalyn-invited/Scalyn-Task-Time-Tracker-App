import { useEffect, useState } from 'react';
import { changePassword, updateProfile } from '../lib/api';
import type { SafeUser } from '../types';

const formatDate = (value?: string): string => {
  if (!value) return '--';
  return new Intl.DateTimeFormat(undefined, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
};

interface ProfilePageProps {
  currentUser: SafeUser;
  onProfileUpdated: (user: SafeUser) => void;
}

export function ProfilePage({ currentUser, onProfileUpdated }: ProfilePageProps) {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  return (
    <section className="route-main">
      <header className="topbar dashboard-topbar">
        <h1>Profile</h1>
        <div className="topbar-actions">
          <a className="action-button" href="/clients">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m-7-7h14" /></svg>
            <span>Manage Clients</span>
          </a>
        </div>
      </header>

      {message ? <div className="feedback" data-tone="success">{message}</div> : null}
      {error ? <div className="feedback" data-tone="error">{error}</div> : null}

      <section className="route-hero">
        <article className="card-panel route-hero-copy profile-hero-panel">
          <p className="route-eyebrow">Account</p>
          <h2 className="route-title">{currentUser.name}</h2>
          <p className="route-copy">{currentUser.email}</p>

          <div className="profile-summary profile-summary-inline">
            <div className="summary-item">
              <span>Created</span>
              <strong>{formatDate(currentUser.createdAt)}</strong>
            </div>
            <div className="summary-item">
              <span>Last updated</span>
              <strong>{formatDate(currentUser.updatedAt)}</strong>
            </div>
          </div>
        </article>

        <aside className="route-metrics">
          <div className="route-metric"><span>Profile status</span><strong>{currentUser.isActive ? 'JWT protected' : 'Inactive'}</strong></div>
          <div className="route-metric"><span>Account email</span><strong>{currentUser.email}</strong></div>
          <div className="route-metric"><span>System role</span><strong>{currentUser.systemRole}</strong></div>
        </aside>
      </section>

      <section className="route-grid">
        <article className="profile-card">
          <div className="toolbar"><h2>Update profile</h2><span className="notice">JWT protected</span></div>
          <div className="divider"></div>
          <form
            className="profile-form"
            onSubmit={async (event) => {
              event.preventDefault();
              try {
                const updated = await updateProfile({ name, email });
                onProfileUpdated(updated);
                setMessage('Profile updated successfully.');
                setError('');
              } catch (updateError) {
                setError(updateError instanceof Error ? updateError.message : 'Unable to save profile');
                setMessage('');
              }
            }}
          >
            <div className="field"><label htmlFor="profile-name-react">Name</label><input id="profile-name-react" value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} /></div>
            <div className="field"><label htmlFor="profile-email-react">Email</label><input id="profile-email-react" value={email} onChange={(event) => setEmail(event.target.value)} required type="email" maxLength={255} /></div>
            <div className="form-actions"><button className="btn btn-primary" type="submit">Save changes</button></div>
          </form>
        </article>

        <article className="profile-card">
          <div className="toolbar"><h2>Change password</h2></div>
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
            <div className="field"><label htmlFor="current-password-react">Current Password</label><input id="current-password-react" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required type="password" /></div>
            <div className="field"><label htmlFor="new-password-react">New Password</label><input id="new-password-react" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required type="password" minLength={8} /></div>
            <div className="field"><label htmlFor="confirm-password-react">Confirm Password</label><input id="confirm-password-react" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required type="password" minLength={8} /></div>
            <div className="form-actions"><button className="btn btn-primary" type="submit">Update password</button></div>
          </form>
        </article>
      </section>
    </section>
  );
}
