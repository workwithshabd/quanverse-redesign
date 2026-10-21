import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.hash = '';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-card">
            <div className="error-icon-wrap">
              <AlertTriangle size={36} className="text-rose" />
            </div>
            <h2 className="error-heading">Something went wrong in this view</h2>
            <p className="error-description">
              A component error occurred. The debugger details are captured below to help you resolve it quickly.
            </p>

            {this.state.error && (
              <div className="error-details-box">
                <div className="error-message-title">Error: {this.state.error.toString()}</div>
                {this.state.errorInfo && (
                  <pre className="error-stack">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            <div className="error-actions">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={this.handleReset}
              >
                <RefreshCw size={16} />
                <span>Reload Application</span>
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  window.location.hash = '';
                  this.setState({ hasError: false });
                }}
              >
                <Home size={16} />
                <span>Return to Student Home</span>
              </button>
            </div>
          </div>

          <style>{`
            .error-boundary-container {
              min-height: 80vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 2rem;
              background: var(--bg-page);
            }
            .error-boundary-card {
              max-width: 640px;
              width: 100%;
              background: #fff;
              border: 1px solid var(--pastel-rose-border);
              border-radius: var(--radius-lg);
              padding: 2.5rem;
              box-shadow: var(--shadow-card);
              text-align: center;
            }
            .error-icon-wrap {
              width: 64px;
              height: 64px;
              border-radius: 50%;
              background: var(--pastel-rose);
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 1.5rem;
            }
            .error-heading {
              font-family: var(--font-display);
              font-size: 1.5rem;
              color: var(--text-main);
              margin-bottom: 0.75rem;
            }
            .error-description {
              font-size: 0.95rem;
              color: var(--text-muted);
              margin-bottom: 1.5rem;
            }
            .error-details-box {
              text-align: left;
              background: #faf7f7;
              border: 1px solid rgba(159, 36, 65, 0.15);
              border-radius: var(--radius-sm);
              padding: 1rem;
              margin-bottom: 1.5rem;
              font-family: var(--font-mono);
              font-size: 0.8rem;
              color: #791e32;
              max-height: 200px;
              overflow-y: auto;
            }
            .error-message-title {
              font-weight: 700;
              margin-bottom: 0.5rem;
            }
            .error-stack {
              white-space: pre-wrap;
              opacity: 0.85;
            }
            .error-actions {
              display: flex;
              gap: 1rem;
              justify-content: center;
              flex-wrap: wrap;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}
