import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { HttpErrorResponse, provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { ILoginError, ILoginSuccess } from "../interfaces/login-res.interface";
import { environment } from "../../../../environments/environment";
import { firstValueFrom } from "rxjs";
import { LocalStorageService } from "../../../core/services/localstorage.service";
import { inject } from "@angular/core";


describe('AuthService', () => {
  let authService: AuthService;
  let httpTesting: HttpTestingController;
  let localStorageService: LocalStorageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        LocalStorageService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    authService = TestBed.inject(AuthService)
    localStorageService = TestBed.inject(LocalStorageService)

    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should createed', () => {
    expect(authService).toBeTruthy();
  });

  it('Login request success', async () => {
    spyOn(localStorageService, 'set');
    let _token: string | null = '';
    const mockRes: ILoginSuccess = {token: 'abc'};

    authService.token$.subscribe(token => {
      _token = token
    });
    const loginReq = firstValueFrom(authService.login('eve.holt@reqres.in', 'cityslicka'))

    const req = httpTesting.expectOne(`${environment.baseUrl}/login`);

    expect(req.request.method).toBe('POST')
    req.flush(mockRes);

    expect(await loginReq).toEqual(mockRes);
    expect(localStorageService.set).toHaveBeenCalledOnceWith('token', mockRes.token);
    expect(_token).toBe(mockRes.token);
  })

  it('login request failed', async() => {
    spyOn(localStorageService, 'set');
    let _token: string | null = '';
    const mockErr: ILoginError = {error: 'error'};
    const loginReq = firstValueFrom(authService.login('eve.holt@reqres.', 'cityslicka'))
    const req = httpTesting.expectOne(`${environment.baseUrl}/login`);
    req.flush(mockErr, {status: 400, statusText: 'Internal Server Error'});
    try {
      await loginReq;
    } catch(err) {
      expect(err).toBe(mockErr)
    }
  })

  it('logout', () => {
    spyOn(localStorageService, 'remove');
    authService.logout();
    let token: string | null = ''
    authService.token$.subscribe(t => {
      token = t
    });

    expect(localStorageService.remove).toHaveBeenCalledOnceWith('token')
    expect(token).toBeNull()
  })

  it('isLogin', () => {
    let token: string | null = ''
    authService.token$.subscribe(t => {
      t = token
    })
    authService.logout();
    const isLogin = authService.isLogin();
    expect(isLogin).toBeFalse()
  })

  afterEach(() => {
    // Verify that none of the tests make any extra HTTP requests.
    TestBed.inject(HttpTestingController).verify();
  });
});
