import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ValidateTimerProperties } from '../validators/timer-validator';
import { mapRange } from '../utils';
import { COLORS } from '../types';

const styles = css`
:host {
    --active-color: var(--primary, #64C7CC);
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

.timer-text {
  font-size: calc(var(--font-size) * 1px);
}

#timer-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#timer-svg circle{
    stroke-dasharray: var(--dash) var(--gap);
    stroke-width: var(--stroke-width);
}
`;

@customElement('lwc-timer')
export class LwcTimer extends LitElement {

  static styles = styles;

  /**
   * The current value of the timer. This value decreases over time
   * until it reaches the minimum value specified by `min`.
   * @type {number}
   */
  @property({ type: Number })
  value = 50;

  /**
   * The minimum value that `value` can be. When `value` reaches this number,
   * a `lwc-timer-expired` event is dispatched.
   * @type {number}
   */
  @property({ type: Number })
  min = 0;

  /**
   * The maximum value that `value` can be.
   * @type {number}
   */
  @property({ type: Number })
  max = 100;

  /**
   * The interval in milliseconds at which the timer updates.
   * @type {number}
   */
  @property({ type: Number })
  interval = 1000;

  /**
   * The size of the timer element in pixels.
   * @type {number}
   */
  @property({ type: Number })
  size = 100;

  connectedCallback(): void {
    ValidateTimerProperties.Validate(this);
    super.connectedCallback();
    this.intervalId = setInterval(() => { this.updateCount() }, this.interval);
  }

  private get radius() {
    return Math.floor(this.size * 0.45);
  }

  private get strokeWidth() {
    return Math.floor(this.size * 0.10);
  }

  private get circumference() {
    return Math.round(2 * (Math.PI * this.radius));
  }

  private get percentage() {
    return Math.max(this.min, Math.min(Math.round((this.max / 100) * this.value), 100));
  }


  private get activeColor() {
    if (this.percentage >= 60) {
      return this.getColorMix(COLORS.Warning, COLORS.Primary, 60, 100);
    }
    return this.getColorMix(COLORS.Danger, COLORS.Warning, 0, 60);
  }

  private getColorMix(minColor: COLORS, maxColor: COLORS, min: number, max: number) {
    const percentage = mapRange(this.percentage, min, max, 0, 100);
    return `color-mix(in srgb, var(--primary, ${maxColor}) ${percentage}%, var(--danger, ${minColor}) ${100 - percentage}%)`;
  }

  // used for svg circle stroke-dasharray
  private get dash() {
    const line = Math.round((this.circumference / 100) * this.percentage);
    return line;
  }

  // used for svg circle stroke-dasharray
  private get gap() {
    return this.circumference - this.dash;
  }

  // a reference to setInterval request id to cancel on disconnect
  private intervalId: ReturnType<typeof setInterval> | undefined;

  private get getStyleInfo(): Record<string, number | string> {
    return {
      '--dash': this.dash, '--gap': this.gap,
      '--min': this.min, '--max': this.max,
      '--size': this.size, '--active-color': this.activeColor,
      '--font-size': Math.round(this.size * 0.18), '--stroke-width': this.strokeWidth
    }
  }

  render() {
    return html`
    <div class="timer" 
        style=${styleMap(this.getStyleInfo)}>
        <svg id="timer-svg" viewBox="0 0 ${this.size} ${this.size}" xmlns="http://www.w3.org/2000/svg">
            <circle 
              cx="${Math.round(this.size / 2)}" 
              cy="${Math.round(this.size / 2)}" 
              r="${this.radius}" fill="none" stroke="var(--active-color)" />
        </svg>
        <span class="timer-text">
        ${this.value}
        </span>
    </div>
    `;
  }

  updateCount() {
    if (this.value <= this.min) {
      this.dispatchEvent(new CustomEvent('lwc-timer-expired', { detail: { expired: true } }))
    } else {
      this.value--;
      this.requestUpdate()
    }
  }

  disconnectedCallback(): void {
    if (!!this.intervalId) clearInterval(this.intervalId);
    super.disconnectedCallback()
  }
}
