import { CommonModule } from '@angular/common';
import { Component, ContentChild, inject, Input, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {
  modal = inject(NgbActiveModal);

  @Input({required: true}) title!: string;
  @Input() modalBodyText = 'Are you sure?'
  @Input() confirmBtnText = 'Confirm'
  @Input() cancelBtnText = 'Cancel'

  @ContentChild('modalBody') modalBody?: TemplateRef<any>;
  @ContentChild('modalActions') modalActions?: TemplateRef<NgbActiveModal>;
}
