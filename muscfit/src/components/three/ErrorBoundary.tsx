import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebGL/Three.js Error caught by boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }
      return (
        <div className="w-full h-full min-h-[300px] bg-gradient-to-tr from-surface to-surface-elevated flex items-center justify-center">
          <span className="font-display uppercase tracking-widest text-text-muted/50 select-none">
            MuscFit 3D Unavailable
          </span>
        </div>
      );
    }

    return this.props.children;
  }
}
