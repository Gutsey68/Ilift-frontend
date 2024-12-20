import { Component, ErrorInfo, ReactNode } from 'react';
import Button from '../ui/Button';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, info);
  }

  handleRefresh = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-2xl">Oops, une erreur s'est produite</p>
          <p className="text-neutral-11">Un problème est survenu. Veuillez essayer de recharger la page.</p>
          <Button onClick={this.handleRefresh}>Recharger la page</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
