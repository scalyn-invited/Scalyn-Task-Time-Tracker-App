import { Link, useLocation } from 'react-router-dom';

interface NotFoundPageProps {
  authenticated?: boolean;
}

export function NotFoundPage({ authenticated = false }: NotFoundPageProps) {
  const location = useLocation();

  return (
    <main className={authenticated ? 'route-main' : 'shell'}>
      <section className={authenticated ? 'card-panel' : 'page'} style={{ maxWidth: authenticated ? '720px' : '960px', margin: authenticated ? '24px auto' : '0 auto' }}>
        <div className="hero-grid" style={{ gridTemplateColumns: '1fr' }}>
          <article className="hero-card">
            <div className="eyebrow">404</div>
            <h1 className="hero-title">Page not found.</h1>
            <p className="hero-copy">
              We couldn&apos;t find <strong>{location.pathname}</strong>. The route may be invalid, outdated, or removed.
            </p>
            <div className="hero-actions">
              {authenticated ? (
                <>
                  <Link className="btn btn-primary" to="/tasks">Go to Tasks</Link>
                  <Link className="btn btn-secondary" to="/timer">Go to Timer</Link>
                </>
              ) : (
                <>
                  <Link className="btn btn-primary" to="/login">Go to Login</Link>
                  <Link className="btn btn-secondary" to="/register">Create account</Link>
                </>
              )}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
