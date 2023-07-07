
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';

@customElement('lwc-expanding-text')
export class LwcExpandingText extends LitElement {
  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :host {
      --color: var(--primary-color, red);
      --font-size: 16;
      --line-height: calc(var(--font-size) + 4);
      position: relative;
    }

    .expandable-wrapper {
      display: inline-block;
      position: relative;
      padding: 16px;
      max-height: 100vh;
      background: color-mix(in srgb, var(--color), transparent 98%);
      box-shadow: 0 3px 12px -10px rgba(0,0,0,0.4);
      border: 1px solid rgba(0,0,0,0.05);
      border-color: color-mix(in srgb, var(--color), transparent 95%);
      font-size: calc(var(--font-size) * 1px);
      line-height: calc(var(--line-height) * 1px);
      transition: max-height 0.2s ease-in;
      overflow:hidden;
    }

    .expandable-wrapper.expandable:not(.--expanded) {
      max-height: calc(((var(--line-height) * var(--lines)) + 32) * 1px);
    }

    .expandable__text {
      max-height: 100vh;
      overflow: hidden;
    }


    .expandable-wrapper.expandable:not(.--expanded) .expandable__text {
      max-height: calc((var(--line-height) * var(--lines)) * 1px);
    }

    .expandable-wrapper.expandable button {
      cursor: pointer;
      border:none;
      outline: none;
      color: color-mix(in srgb, var(--color), blue 80%);
      background: color-mix(in srgb, var(--color), white 95%);
      position: absolute;
      right: 16px;
      bottom: 16px;
      z-index: 2;
      transition: 0.2s ease-in;
      transform-origin: center center;
    }

    .expandable-wrapper.expandable:not(.--expanded) button::before {
      position: absolute;
      inset: 0;
      left: -124px;
      top: -4px;
      content: '';
      background: linear-gradient(to right,transparent, color-mix(in srgb, var(--color), white 98%) 70%);
      z-index: -1;
    }

    .expandable.--expanded button {
      position: relative;
      right: unset;
      bottom: unset;
    }

    p.hide-element {
      padding-inline: 16px;
      opacity: 0;
      z-index:-1;
      line-height: calc(var(--line-height) * 1px);
      font-size: calc(var(--font-size) * 1px);
      display: inline-block;
    }
  `;

  @property()
  text = 'lwc-expanding-text loaded!';

  @property()
  lines = 3;

  canExpand = false;

  @state()
  expanded = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.canExpand = this.doesTextNeedToBeExpanded();
  }

  render() {
    console.log('dfosjf', this.canExpand)
    const classess = classMap({
      "--expanded": this.expanded,
      "expandable-wrapper": true,
      "expandable": this.canExpand
    });

    const button = html`
      <button @click=${this.toggleExpand} type="button">
        Show ${this.expanded ? 'less' : 'more'}
      </button>
    `;

    return html`
      <div style="--lines: ${this.lines}"  class=${classess}>
        <p class="expandable__text">
          ${this.text}
        </p>
        
        ${when(this.canExpand, () => button, () => undefined)}
      </div>
    `;
  }

  toggleExpand() {
    this.expanded = !this.expanded;
    this.requestUpdate();
  }

  private doesTextNeedToBeExpanded() {
    const lineCount = this.calculateLines();
    return this.lines < lineCount;
  }

  private calculateLines() {
    let p = document.createElement('p');
    p.classList.add('hide-element');
    p.innerHTML = this.text;
    this.shadowRoot?.appendChild(p);
    const height = p.scrollHeight ?? 0;
    const lineHeight = parseInt(getComputedStyle(p).lineHeight);
    const lineCount = height / lineHeight;
    this.shadowRoot?.removeChild(p);
    return lineCount;
  }
}
