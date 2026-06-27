import { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, setToken } from '../lib/api';
import type { SafeUser } from '../types';

interface LoginPageProps {
  currentUser: SafeUser | null;
  onLoggedIn: (user: SafeUser) => void;
}

export function LoginPage({ currentUser, onLoggedIn }: LoginPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate('/tasks', { replace: true });
    }
  }, [currentUser, navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback('');
    setSubmitting(true);

    try {
      const response = await login({ email: email.trim(), password });
      setToken(response.accessToken);
      onLoggedIn(response.user);
      const next = (location.state as { from?: string } | null)?.from || '/tasks';
      navigate(next, { replace: true });
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Unable to login');
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
            <Link to="/register">Register</Link>
          </nav>
        </header>

        <div className="hero-grid">
          <article className="hero-card">
            <div className="eyebrow">Welcome back</div>
            <h1 className="hero-title">Sign in to your workspace.</h1>
            <p className="hero-copy">Log in to continue tracking work, time, teams, and reports.</p>
            <div className="hero-actions">
              <Link className="btn btn-secondary" to="/register">Need an account?</Link>
            </div>
          </article>

          <section className="form-card">
            <div className="form-head">
              <h2 className="form-title">Login</h2>
              <p className="form-subtitle">Use your email and password to unlock the app.</p>
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="login-email-react">Email</label>
                <input id="login-email-react" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </div>

              <div className="field">
                <label htmlFor="login-password-react">Password</label>
                <input id="login-password-react" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </div>

              <div className="form-actions">
                <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? 'Signing in...' : 'Sign in'}</button>
                <Link className="mini-link" to="/register">Create a new account</Link>
              </div>

              {feedback ? <div className="feedback" data-tone="error">{feedback}</div> : null}
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
