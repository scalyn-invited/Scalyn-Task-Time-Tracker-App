import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../lib/api';
import type { SafeUser } from '../types';

interface RegisterPageProps {
  currentUser: SafeUser | null;
}

export function RegisterPage({ currentUser }: RegisterPageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate('/timer', { replace: true });
    }
  }, [currentUser, navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback('');
    setSubmitting(true);

    try {
      await register({ name: name.trim(), email: email.trim(), password });
      navigate(`/login?registered=1&email=${encodeURIComponent(email.trim())}`, { replace: true });
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Unable to register');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="shell">
      <section className="page">
        <header className="topbar">
          <a className="brand" href="/">
            <div className="brand-mark">S</div>
            <div>Scalyn Task Time Tracker</div>
          </a>
          <nav className="nav">
            <Link to="/login">Login</Link>
          </nav>
        </header>

        <div className="hero-grid">
          <article className="hero-card">
            <div className="eyebrow">Create your account</div>
            <h1 className="hero-title">Start tracking with a clean, focused workflow.</h1>
            <p className="hero-copy">Register a new account to access the full workspace.</p>
            <div className="hero-actions">
              <Link className="btn btn-secondary" to="/login">Already registered?</Link>
            </div>
          </article>

          <section className="form-card">
            <div className="form-head">
              <h2 className="form-title">Register</h2>
              <p className="form-subtitle">Create a user account to access your profile.</p>
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="register-name-react">Name</label>
                <input id="register-name-react" type="text" value={name} onChange={(event) => setName(event.target.value)} minLength={2} maxLength={100} required />
              </div>

              <div className="field">
                <label htmlFor="register-email-react">Email</label>
                <input id="register-email-react" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </div>

              <div className="field">
                <label htmlFor="register-password-react">Password</label>
                <input id="register-password-react" type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required />
                <div className="help">Use at least 6 characters.</div>
              </div>

              <div className="form-actions">
                <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? 'Creating...' : 'Create account'}</button>
                <Link className="mini-link" to="/login">Back to login</Link>
              </div>

              {feedback ? <div className="feedback" data-tone="error">{feedback}</div> : null}
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
