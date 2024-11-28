import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILoginFormControls } from '../interfaces/login-form-controls.interface';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ToastService } from '../../../lib/toast/service/toast.service';
import { ILoginError } from '../interfaces/login-res.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  loading = false;
  private destroy$ = new Subject<void>()

  loginForm = new FormGroup<ILoginFormControls>({
    email: new FormControl(
      undefined,
      {
        validators: [Validators.required, Validators.email],
        nonNullable: true
      }
    ),
    password: new FormControl(
      undefined,
      {
        validators: [Validators.required],
        nonNullable: true
      }
    )
  })

  submit() {
    const {email, password} = this.loginForm.value;
    if(!email || !password) return this.loginForm.updateValueAndValidity();
    this.loading = true;
    this.authService.login(email.trim(), password).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading = false)
    ).subscribe({
      next: (_) => {
        this.toastService.show({ className: 'bg-success', body: 'You are logged in successfully.'})
      },
      error: (err: ILoginError) => {
        this.toastService.show({ className: 'bg-danger', body: err.error})
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
