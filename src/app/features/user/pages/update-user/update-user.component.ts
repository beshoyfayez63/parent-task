import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';
import { UserFormModel } from '../../models/user-form.model';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../../../lib/toast/service/toast.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  userService = inject(UserService);
  toastService = inject(ToastService);

  loading = false;

  get user() {
    return this.activatedRoute.snapshot.data['user'] as IUser;
  }

  userFormModel = new UserFormModel(this.user);

  formGroup = this.userFormModel.formGroup;

  onSubmit() {
    if(this.formGroup.invalid) return this.formGroup.updateValueAndValidity();
    this.loading = true;
    this.userService.createUser(this.formGroup.value)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: _ => {
        this.toastService.show({className: 'bg-success text-white', body: 'User Added successfully.'});
        this.router.navigate(['/users'])
      },
      error: _ => {
        this.toastService.show({className: 'bg-danger text-white', body: 'User Added failed.'})
      }
    });
  }
}
