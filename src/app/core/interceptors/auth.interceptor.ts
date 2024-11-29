import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.token$.pipe(
      take(1),
      switchMap((token) => {
        let modifiedReq = req.clone({
          headers: req.headers
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json'),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
