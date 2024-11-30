import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ILoginError, ILoginSuccess } from "../interfaces/login-res.interface";
import { LocalStorageService } from "../../../core/services/localstorage.service";

@Injectable({providedIn: 'root'})
export class AuthService {
  http = inject(HttpClient);
  localStorage = inject(LocalStorageService)

  private token = new BehaviorSubject<string | null>(this.localStorage.get('token'));
  readonly token$ = this.token.asObservable();

  isLogin() {
    return !!this.token.value;
  }

  login(email: string, password: string) {
    return this.http.post<ILoginSuccess | ILoginError>(`${environment.baseUrl}/login`, {
      email,
      password
    }).pipe(
      tap(data => {
        if('token' in data) {
          this.token.next(data.token);
          this.localStorage.set('token', data.token)
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error as ILoginError)
      })
    )
  }

  logout() {
    this.token.next(null);
    this.localStorage.remove('token')
  }
}
