
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface DropdownItem {
  text: string;
}

@customElement('lwc-dropdown')
export class LwcDropdown extends LitElement {
  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :host {
      --color: var(--primary-color, #303134);
    }

    .dropdown {
      display: inline-block;
      padding: 4px;
      color:  var(--color);
      border: 1px solid color-mix(in srgb, currentColor, transparent 80%);
      border-radius: 2px;
    }
    
    .dropdown__heading {
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }

    .dropdown__icon {
      font-size: 18px;
      transition: transform 0.2s ease-in-out;
      transform-origin: center;
      color: color-mix(in srgb, var(--color), transparent 35%);
    }

    .dropdown--active .dropdown__icon {
      transform: rotate(90deg);
    }

    .dropdown__items {
      display: flex;
      flex-direction: column;
      margin-inline-start: 26px;
      overflow: hidden;
      transition: 0.2s ease-in-out;
      max-height: 0;
      gap: 2px;
      padding-top: -4px;
    }
    
    .dropdown--active .dropdown__items {
      padding-top: 6px;
      max-height: 500px;
    }

    .dropdown__item {
      cursor: pointer;
      text-align: center;
      background: color-mix(in srgb, var(--color), transparent 95%);;
      padding: 4px;
    }
  `;

  @property()
  title = 'lwc-dropdown loaded!';

  @property({ type: Array<DropdownItem> })
  items: DropdownItem[] = [];

  @state()
  open = false;

  render() {
    console.log(this.items)
    const dropdownClassess = classMap({
      dropdown: true,
      'dropdown--active': this.open
    })

    const itemList = html`
      <div class="dropdown__items">
        ${this.items.map(item => (
      html`
              <div @click=${() => this.selectDropdownItem(item)} class="dropdown__item">
                ${item.text}
              </div>
              `
    ))}
      </div>
    `;

    return html`
      <div class=${dropdownClassess}>
        <div @click=${this.toggleDropdown} class="dropdown__heading">
          <svg
              class="dropdown__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M6 4l6 5-6 5" stroke="currentColor" stroke-width="2" fill="none" />
          </svg>
          <p class="dropdown__title">${this.title}</p>
        </div>
        ${itemList}
      </div>
    `;
  }

  selectDropdownItem(item: DropdownItem) {
    this.dispatchEvent(new CustomEvent('itemSelected', { detail: item, bubbles: true }))
  }

  toggleDropdown() {
    this.open = !this.open;
    this.requestUpdate()
  }
}
