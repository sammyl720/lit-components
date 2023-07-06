import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lwc-simple-link')
export class SimpleLink extends LitElement {

  static styles = css`a { color: blue; text-decoration: none; }`;

  @property({ type: String })
  text = 'Simple Link';

  @property({ type: String })
  href = '#';

  render() {
    return html`<a href="${this.href}">${this.text}</a>`;
  }
}