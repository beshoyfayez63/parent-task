import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormModule } from '../../../lib/form/form.module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TextInputComponent } from '../../../lib/form/components/text-input/text-input.component';
import { ILoginFormControls } from '../interfaces/login-form-controls.interface';
import { ToastService } from '../../../lib/toast/service/toast.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ILoginError, ILoginSuccess } from '../interfaces/login-res.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginForm: FormGroup<ILoginFormControls>;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let router: Router;
  let toastService: ToastService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormModule, ReactiveFormsModule],
      providers: [
        AuthService,
        // ToastService,
        {provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', ['post'])},
      ]
    })

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginForm = component.loginForm;
    fixture.detectChanges();

    router = TestBed.inject(Router)
    toastService = TestBed.inject(ToastService);
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    spyOn(toastService, 'show')
    spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when email input change formControl should changed', () => {
    const textInputs = fixture.debugElement.query(By.css('form'))
    .queryAll(By.directive(TextInputComponent));
    const emailInput: TextInputComponent = textInputs[0].componentInstance;
    emailInput.onInputChange('e@e.com')
    expect(loginForm.controls.email.value).toBe('e@e.com')
  });

  it('when password input change formControl should changed', () => {
    const textInputs = fixture.debugElement.query(By.css('form')).queryAll(By.directive(TextInputComponent));
    const passwordInput: TextInputComponent = textInputs[1].componentInstance;
    passwordInput.onInputChange('111111')
    expect(loginForm.controls.password.value).toBe('111111')
  });

  it('validate email', () => {
    const textInputs = fixture.debugElement.query(By.css('form'))
    .queryAll(By.directive(TextInputComponent));
    const emailInput: TextInputComponent = textInputs[0].componentInstance;
    emailInput.onInputChange('e')
    expect(loginForm.controls.email.invalid).toBeTrue()
    emailInput.onInputChange('')
    expect(loginForm.controls.email.invalid).toBeTrue()
  });

  it('validate password', () => {
    const textInputs = fixture.debugElement.query(By.css('form'))
    .queryAll(By.directive(TextInputComponent));
    const passwordInput: TextInputComponent = textInputs[1].componentInstance;
    passwordInput.onInputChange('')
    expect(loginForm.controls.password.invalid).toBeTrue()
  });

  it('on login successfully', () => {
    const loginRes: ILoginSuccess = {token: 'abc'}
    httpClient.post.and.returnValue(of(loginRes));

    const form = fixture.debugElement.query(By.css('form'))
    loginForm.setValue({email: 'b@b.com', password: '123'})
    form.triggerEventHandler('ngSubmit');
    fixture.detectChanges();
    expect(toastService.show).toHaveBeenCalledOnceWith({
      className: 'bg-success',
      body: 'You are logged in successfully.'
    })
    expect(router.navigate).toHaveBeenCalledOnceWith([''])
  });

  xit('on login failed', () => {
    const loginRes: ILoginError = {error: 'Error'}
    console.log(loginRes)

    // httpClient.post.and.throwError(new HttpErrorResponse({error: loginRes})).and.returnValue(throwError(loginRes))

    const form = fixture.debugElement.query(By.css('form'))
    loginForm.setValue({email: 'b@b.com', password: '123'})
    form.triggerEventHandler('ngSubmit');
    fixture.detectChanges();
    expect(toastService.show).toHaveBeenCalledOnceWith({ className: 'bg-danger', body: 't'})
  });
});
