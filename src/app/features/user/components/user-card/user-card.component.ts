import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../../../lib/modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  private modalService = inject(NgbModal);

  @Input() user?: IUser;

  @Output() onDelete = new EventEmitter<IUser>();
  @Output() onEdit = new EventEmitter<number>();

  async deleteItem(event: Event) {
    event.stopPropagation()
    const modalRef = this.modalService.open(ConfirmationModalComponent)
    modalRef.componentInstance.title = 'User Deletion';
    try {
      await modalRef.result;
      this.onDelete.emit(this.user);
    } catch(err) {}
  }

  onEditItem(event: Event) {
    event.stopPropagation();
    this.onEdit.emit(this.user!.id)
  }
}
