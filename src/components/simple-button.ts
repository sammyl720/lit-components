import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('lwc-simple-button')
export class SimpleButton extends LitElement {

  static styles = css`
    .btn { 
      outline: none;
      border: 1px solid black;
      border-radius: 4px;
      box-shadow: 1px 1px 20px -14px rgba(0,0,0,0.1);
      background: transparent;
      padding: 3px 6px;
    }`
    ;

  @property({ type: String })
  text = 'Simple Button';
  render() {
    const classes = { btn: true }
    return html`<button class=${classMap(classes)}>${this.text}</button>`;
  }
}