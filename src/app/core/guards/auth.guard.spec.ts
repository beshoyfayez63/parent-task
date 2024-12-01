import { fakeAsync, TestBed, tick } from "@angular/core/testing"
import { authGuardFn } from "./auth.guard"
import { ActivatedRoute, provideRouter, Router, RouterStateSnapshot } from "@angular/router"
import { AuthService } from "../../features/auth/services/auth.service";
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
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['isLogin']);

    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authService
        },
      ]
    })
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router)

  })

  it('should navigate to root if logged in and route state is auth', fakeAsync(() => {
    authService.isLogin.and.returnValue(true);
    spyOn(router, 'navigate');

    TestBed.runInInjectionContext(
      () => authGuardFn(activatedRoute.snapshot, routeState())
    ) as Promise<boolean>;
    tick();
    expect(router.navigate).toHaveBeenCalledOnceWith(['']);
  }))

  it('should stay at users route, if he logged in and the route state is users', fakeAsync(() => {
    authService.isLogin.and.returnValue(true);
    spyOn(router, 'navigate');

    const guardRes = TestBed.runInInjectionContext(
      () => authGuardFn(activatedRoute.snapshot, routeState('/users'))
    ) as Promise<boolean>;
    let response: boolean = false;
    guardRes.then(value => response = value);
    tick();
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(response).toBe(true)
  }))

  it('should stay at login page, if he is not logged in and the route state is auth', fakeAsync(() => {
    authService.isLogin.and.returnValue(false);
    spyOn(router, 'navigate');

    const guardRes = TestBed.runInInjectionContext(
      () => authGuardFn(activatedRoute.snapshot, routeState())
    ) as Promise<boolean>;
    let response: boolean = false;
    guardRes.then(value => response = value);
    tick();
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(response).toBe(true)
  }))

  it('should go to login, if routeState is users', fakeAsync(() => {
    authService.isLogin.and.returnValue(false);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    const guardRes = TestBed.runInInjectionContext(
      () => authGuardFn(activatedRoute.snapshot, routeState('/users'))
    ) as Promise<boolean>;
    let response: boolean = false;
    guardRes.then(value => (response = value));
    tick();
    expect(router.navigate).toHaveBeenCalledOnceWith(['/auth/login']);
    expect(response).toBe(true)
  }))
})


function routeState(url = '/auth/login') {
  return { url } as RouterStateSnapshot
}
