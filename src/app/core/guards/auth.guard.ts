import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../features/auth/services/auth.service";

export const authGuardFn: CanActivateFn = async (_, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLogin = authService.isLogin();

  if(isLogin) {
    return !!state.url.includes('users') || await router.navigate([''])
  } else {
    return !!state.url.includes('auth') || await router.navigate(['/auth/login'])
  }
}
