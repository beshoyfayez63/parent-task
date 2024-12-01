import { fakeAsync, TestBed } from "@angular/core/testing"
import { authGuardFn } from "./auth.guard"
import { ActivatedRoute, provideRouter, RouterStateSnapshot } from "@angular/router"
import { AuthService } from "../../features/auth/services/auth.service";
import { LoginComponent } from "../../features/auth/login/login.component";
import { ListUserComponent } from "../../features/user/pages/list-user/list-user.component";
import { Component } from "@angular/core";

@Component({
  selector: 'dumm1',
  template: ''
})
export class Dummy1 {}

@Component({
  selector: 'dumm2',
  template: ''
})
export class Dummy2 {}

describe('AuthGuard', () => {
  let activatedRoute: ActivatedRoute;
  let routeState: RouterStateSnapshot;
  let authService: jasmine.SpyObj<AuthService>

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['isLogin'])

    TestBed.configureTestingModule({
      declarations: [Dummy1, Dummy2],
      providers: [
        ActivatedRoute,
        provideRouter([
          {path: 'auth', component: Dummy1},
          {path: 'users', component: Dummy2}
        ]),
        RouterStateSnapshot,
        {
          provide: AuthService,
          useValue: authService
        }
      ]
    })
    activatedRoute = TestBed.inject(ActivatedRoute);
    routeState = TestBed.inject(RouterStateSnapshot);

    // guardRes = await TestBed.runInInjectionContext(() => authGuardFn(activatedRoute, routeStateSnapshot));
  })

  xit('should return true if user logged in', fakeAsync(() => {
    authService.isLogin.and.returnValue(true);
    const guardRes = TestBed.runInInjectionContext(
      () => authGuardFn(activatedRoute.snapshot, routeState)
    );
  }))
})
