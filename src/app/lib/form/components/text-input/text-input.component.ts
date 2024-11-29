import { Component, forwardRef, Input } from '@angular/core';
import { BaseInput } from '../../models/base-input';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true
    }
  ]
})
export class TextInputComponent extends BaseInput<string> {
  @Input() messages: Record<string, string | null> = {};
  @Input() type = 'text';

  onInputChange(value: string) {
    this.onChange(value);
    this.onTouch();
  }
}
