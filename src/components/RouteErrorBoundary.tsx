import { Component, type ReactNode } from "react";

/**
 * Se o pacote de uma página não carrega (ex.: aba antiga depois de uma publicação),
 * mostra uma saída em vez de deixar a tela em branco.
 */
export default class RouteErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="not-found" aria-labelledby="route-error-title">
        <h1 id="route-error-title">A página não carregou.</h1>
        <p>O site pode ter sido atualizado enquanto esta aba estava aberta. Recarregar resolve.</p>
        <div className="not-found__actions">
          <button type="button" className="button button--primary" onClick={() => window.location.reload()}>
            Recarregar a página
          </button>
          <a href="/" className="button button--quiet">Ir para a página inicial</a>
        </div>
      </section>
    );
  }
}
