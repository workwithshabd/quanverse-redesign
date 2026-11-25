import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.hash = '';
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center p-8 bg-[var(--bg-page)]">
          <div className="max-w-[640px] w-full bg-white border border-[#fac8d4] rounded-2xl p-10 shadow-lg text-center">
            <div className="w-16 h-16 rounded-full bg-[#fde9ee] flex items-center justify-center mx-auto mb-6 text-rose-500">
              <AlertTriangle size={36} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#0f2d1e] mb-3">Something went wrong in this view</h2>
            <p className="text-[0.95rem] text-[#4d6a59] mb-6">
              A component error occurred. The debugger details are captured below to help you resolve it quickly.
            </p>

            {this.state.error && (
              <div className="text-left bg-[#faf7f7] border border-rose-900/15 rounded-md p-4 mb-6 font-mono text-xs text-[#791e32] max-h-48 overflow-y-auto">
                <div className="font-bold mb-2">Error: {this.state.error.toString()}</div>
                {this.state.errorInfo && (
                  <pre className="whitespace-pre-wrap opacity-85">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            <div className="flex gap-4 justify-center flex-wrap">
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
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
