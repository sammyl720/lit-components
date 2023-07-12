/**
 * Linearly maps a value from one range to another.
 *
 * @param value - The input value in the original range.
 * @param inMin - The lower bound of the original range.
 * @param inMax - The upper bound of the original range.
 * @param outMin - The lower bound of the target range.
 * @param outMax - The upper bound of the target range.
 * @returns The corresponding value in the target range.
 */
export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return ((value - inMin) * (outMax - outMin) / (inMax - inMin)) + outMin;
}