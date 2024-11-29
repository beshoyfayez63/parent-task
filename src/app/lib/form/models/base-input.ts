import { Directive, inject, Injector } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";

@Directive()
export class BaseInput<T = any> implements ControlValueAccessor {
  value: T | undefined | null;
  onChange: (value: T | null | undefined) => void = () => {};
  onTouch: () => void = () => {};
  isDisabled = false;

  injector = inject(Injector);

  get ngControl () {
    return this.injector.get(NgControl, null)
  }

  writeValue(value: undefined | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }
}
