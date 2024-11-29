import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../../../lib/toast/service/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../../../lib/modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {

  private activatedRoute = inject(ActivatedRoute);
  private userService = inject(UserService);
  private toast = inject(ToastService);
  router = inject(Router);
  private modalService = inject(NgbModal);

  user: Observable<IUser> = this.activatedRoute.data.pipe(map((data) => data['user']));

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: _ => {
        this.toast.show({className: 'bg-success', body: 'User has been deleted.'})
        this.router.navigate(['/users'])
      }
    });
  }

  async deleteAction(userId: number) {
    const modalRef = this.modalService.open(ConfirmationModalComponent)
    modalRef.componentInstance.title = 'User Deletion';
    const res = await modalRef.result;
    if(res) {
      this.deleteUser(userId)
    }
  }

  editAction(userId: number) {
    this.router.navigate(['/users/edit', userId]);
  }
}
