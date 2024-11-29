import { Component, inject } from '@angular/core';
import { UserFormModel } from '../../models/user-form.model';
import { UserService } from '../../services/user.service';
import { finalize } from 'rxjs';
import { ToastService } from '../../../../lib/toast/service/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  router = inject(Router);
  toastService = inject(ToastService);
  userService = inject(UserService);
  userFormModel = new UserFormModel();
  formGroup = this.userFormModel.formGroup;
  loading = false;

  onSubmit() {
    if(this.formGroup.invalid) return this.formGroup.updateValueAndValidity();
    this.loading = true;
    this.userService.createUser(this.formGroup.value)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: _ => {
        this.toastService.show({className: 'bg-success text-white', body: 'User Added successfully.'})
        this.router.navigate(['/users'])
      },
      error: _ => {
        this.toastService.show({className: 'bg-danger text-white', body: 'User Added failed.'})
      }
    });
  }
}
