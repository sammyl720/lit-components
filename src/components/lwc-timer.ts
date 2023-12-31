import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ValidateTimerProperties } from '../validators/timer-validator';
import { mapRange } from '../utils';
import { COLORS } from '../types';
import { classMap } from 'lit-html/directives/class-map.js';

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
  z-index: 3;
}

#timer-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#timer-svg circle {
  stroke-width: var(--stroke-width);
  opacity: 1;
}

.timer #timer-svg #timer-circle{
    stroke-dasharray: var(--dash) var(--gap);
    transition: var(--interval) linear;
    stroke-linecap: var(--line-cap);
}

.--completed:not(.--ascending) #timer-circle {
  opacity:0;
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

  /**
   * Should the timer value increase until the max
   * @type {boolean}
   */
  @property({ type: Boolean })
  ascending = false;

  connectedCallback(): void {
    ValidateTimerProperties.Validate(this);
    super.connectedCallback();
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
    return mapRange(this.value, this.min, this.max, 0, 100);
  }

  private get normalizedPercentage() {
    return this.ascending ? Math.round(100 - this.percentage) : this.percentage;
  }

  private get activeColor() {
    if (this.normalizedPercentage >= 60) {
      return this.getColorMix(COLORS.Warning, COLORS.Primary, 60, 100);
    }
    return this.getColorMix(COLORS.Danger, COLORS.Warning, 0, 60);
  }

  private getColorMix(minColor: COLORS, maxColor: COLORS, min: number, max: number) {
    const percentage = mapRange(this.normalizedPercentage, min, max, 0, 100);
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
  private timeoutId: ReturnType<typeof setTimeout> | undefined;

  private get isStillActive() {
    return this.ascending ? this.value < this.max : this.value > this.min;
  }

  private updateValue() {
    this.value += this.ascending ? 1 : -1;
  }

  private get getStyleInfo(): Record<string, number | string> {
    return {
      '--dash': this.dash, '--gap': this.gap, "--percentage": Math.round(100 - this.normalizedPercentage),
      '--min': this.min, '--max': this.max, '--line-cap': this.percentage === 100 ? 'butt' : 'round',
      '--size': this.size, '--active-color': this.activeColor, '--interval': this.interval + 'ms',
      '--font-size': Math.round(this.size * 0.18), '--stroke-width': this.strokeWidth
    }
  }

  private get completed() {
    return !this.normalizedPercentage;
  }

  private get cssClasses() {
    return {
      '--completed': !this.normalizedPercentage,
      '--ascending': this.ascending,
      timer: true
    }
  }

  render() {
    this.timeoutId = setTimeout(() => { this.updateCount() }, this.interval);
    return html`
    <div class=${classMap(this.cssClasses)}
        style=${styleMap(this.getStyleInfo)}>
        <svg id="timer-svg" viewBox="0 0 ${this.size} ${this.size}" xmlns="http://www.w3.org/2000/svg">
            <circle 
              cx="${Math.round(this.size / 2)}" 
              cy="${Math.round(this.size / 2)}" 
              r="${this.radius}" fill="none" stroke="rgba(0,0,0,0.15)" />
            <circle 
              id="timer-circle"
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
    if (this.isStillActive) {
      this.updateValue();
      this.requestUpdate();
    } else {
      this.dispatchEvent(new CustomEvent('lwc-timer-expired', { detail: { expired: true, element: this }, bubbles: true }));
      console.log(this.percentage, this.normalizedPercentage, this.ascending)
      this.clearTimer();
    }
  }

  private clearTimer() {
    if (!!this.timeoutId) clearTimeout(this.timeoutId);
  }

  disconnectedCallback(): void {
    this.clearTimer();
    super.disconnectedCallback()
  }
}
