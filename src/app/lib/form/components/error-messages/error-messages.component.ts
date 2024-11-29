import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrl: './error-messages.component.scss'
})
export class ErrorMessagesComponent implements OnChanges {
  @Input() messages: Record<string, string | null> = {};

  message: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['messages']) {
      this.message = this.messages[Object.keys(this.messages)[0]]
    }
  }
}
