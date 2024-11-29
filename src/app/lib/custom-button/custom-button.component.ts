import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class CustomButtonComponent {
  @Input() btnText = ''
  @Input() type = 'submit'
  @Input() classNames = '';
  @Input() disabled = false;
  @Input() loading = false;

  @Output() onBtnClicked = new EventEmitter<Event>();
}
