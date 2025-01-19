import { Component, ErrorInfo, ReactNode } from 'react';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import MobileBottomNav from '../layout/navbar/MobileBottomNav';
import Button from '../ui/Button';

/**
 * Props du composant ErrorBoundaryWithLayout
 * @typedef {object} Props
 * @property {ReactNode} children - Les composants enfants à surveiller
 */
type Props = {
  children: ReactNode;
};

/**
 * État du composant ErrorBoundaryWithLayout
 * @typedef {object} State
 * @property {boolean} hasError - Indique si une erreur a été capturée
 */
type State = {
  hasError: boolean;
};

/**
 * Composant de gestion des erreurs React avec mise en page complète
 * Capture les erreurs des composants enfants et affiche une interface de repli
 * avec header, footer et navigation mobile
 * @component
 * @extends {Component<Props, State>}
 */
class ErrorBoundaryWithLayout extends Component<Props, State> {
  state: State = { hasError: false };

  /**
   * Met à jour l'état quand une erreur est capturée
   */
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  /**
   * Gère la journalisation des erreurs capturées
   * @param {Error} error - L'erreur capturée
   * @param {ErrorInfo} info - Informations supplémentaires sur l'erreur
   */
  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, info);
  }

  /**
   * Gère le rechargement de la page
   */
  handleRefresh = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen flex-col justify-between bg-neutral-1 max-lg:px-4">
          <Header />
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-2xl">Oops, une erreur s'est produite</p>
            <p className="text-neutral-11">Un problème est survenu. Veuillez essayer de recharger la page.</p>
            <Button onClick={this.handleRefresh}>Recharger la page</Button>
          </div>
          <Footer />
          <MobileBottomNav />
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWithLayout;
