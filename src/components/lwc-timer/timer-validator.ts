export interface ITimer {
  max: number;
  min: number;
  value: number;
  interval: number;
}

export class ValidateTimerProperties {
  private isValidated = false;
  private constructor(private timer: ITimer) {
    this.assert(this.isMinLessThanMax(), `The "min" property should be less than the "max" property. Got min: ${timer.min}, max: ${timer.max}`);
    this.assert(this.isValueWithinRange(), `The "value" property should be within range of the "min" and "max" boundaries. Got min: ${timer.min}, value: ${timer.value}, max: ${timer.max}`);
    this.assert(this.isIntervalPositiveInteger(), `The 'interval' property should be a positive integer. Got interval: ${timer.interval}`);
    this.isValidated = true;
  }

  static Validate(timer: ITimer) {
    const validator = new ValidateTimerProperties(timer);
    return validator.isValidated;
  }

  private isMinLessThanMax() {
    return this.timer.min < this.timer.max;
  }

  private isValueWithinRange() {
    return this.timer.value >= this.timer.min && this.timer.value <= this.timer.max;
  }

  private isIntervalPositiveInteger() {
    return this.timer.interval > 0;
  }

  private assert(value: boolean, message: string) {
    if (!value) throw new Error(message);
  }
}