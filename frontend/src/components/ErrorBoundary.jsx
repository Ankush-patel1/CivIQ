import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production, send to your error tracking service (e.g., Sentry)
    console.error('[CivIQ ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '20px', padding: '40px', textAlign: 'center',
          background: '#0b1326', color: '#dae2fd', fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          <div style={{ fontSize: '56px' }}>⚠️</div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>Something went wrong</h1>
          <p style={{ color: '#c7c4d8', maxWidth: '400px', lineHeight: 1.6 }}>
            CivIQ encountered an unexpected error. Your data has not been lost.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
              color: '#fff', border: 'none', borderRadius: '9999px',
              padding: '14px 28px', fontSize: '15px', fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 4px 20px rgba(79,70,229,0.4)',
            }}
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'transparent', color: '#918fa1', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '9999px', padding: '12px 24px', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Reload Page
          </button>
          {import.meta.env.DEV && this.state.error && (
            <pre style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(248,113,113,0.3)',
              borderRadius: '12px', padding: '16px', fontSize: '12px', color: '#f87171',
              maxWidth: '600px', overflowX: 'auto', textAlign: 'left',
            }}>
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
