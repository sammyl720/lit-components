import { css } from "lit";

export const styles = css`
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
`