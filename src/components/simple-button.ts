import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lwc-simple-button')
export class SimpleButton extends LitElement {

  static styles = css`p { color: blue; }`;

  @property({ type: String })
  text = 'Simple Button';
  render() {
    return html`<p>${this.text}</p>`;
  }
}