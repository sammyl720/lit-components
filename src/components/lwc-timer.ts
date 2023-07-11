import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lwc-timer')
export class LwcTimer extends LitElement {

  static styles = css`
    :host {
        --active-color: green;
    }
    .timer {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(var(--size, 100) * 1px);
        height: calc(var(--size, 100) * 1px);
        color: var(--active-color);
        cursor: pointer;
    }

    #timer-svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #timer-svg circle{
        stroke-dashoffset: calc(var(--circumference)  / 2);
        stroke-dasharray: var(--dash) var(--gap);
    }
  `;

  @property({ type: Number })
  count = 25;

  @property() 
  min = 0;

  @property()
  max = 100;

  // ms interval update
  @property()
  interval = 100;

  @property()
  radius = 40;

  @property()
  size = 100;

  get circumference() {
    return 2 * (Math.PI * this.radius);
  }

  get percentage() {
    return Math.max(this.min, Math.round((this.max / 100) * this.count));
  }
  get color() {
    if (this.percentage >= 66) {
        return "var(--primary, green)"
    }
    else if (this.percentage >= 35)
    {
        return "var(--warning, orange)";
    }

    return 'var(--danger, red)';
  }

  get dash() {
    const percent = Math.round((this.max / 100) * this.count);
    const line = Math.round((this.circumference / 100) * percent);
    return line;
  }

  get gap() {
    return this.circumference - this.dash;
  }

  render() {
    setTimeout(() => { this.updateCount()}, this.interval)
    return html`
    <div class="timer" 
        style="--dash: ${this.dash}; --gap: ${this.gap}; --circumference: ${this.circumference}; --count: ${this.count}; --min: ${this.min};--max: ${this.max}; --size: ${this.size}; --active-color: ${this.color}">
        <svg id="timer-svg" viewBox="0 0 ${this.size} ${this.size}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${Math.round(this.size / 2)}" cy="${Math.round(this.size / 2)}" r="${this.radius}" fill="none" stroke="var(--active-color)" stroke-width='10' />
        </svg>
        <span class="timer-text">
        ${this.count}
        </span>
    </div>
    `;
  }

  updateCount() {
    if (this.count <= this.min) {
        this.dispatchEvent(new CustomEvent('timer-expired', { detail: { expired: true }}))
    } else {
        this.count--;
        this.requestUpdate()
    }
  }
}