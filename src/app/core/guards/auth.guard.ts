import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../features/auth/services/auth.service";

export const authGuardFn: CanActivateFn = async (_, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLogin = authService.isLogin();
  if(isLogin) {
    if(state.url.includes('users')) {
      return true;
    } else {
      return await router.navigate(['']);
    }
  } else {
    if(state.url.includes('auth')) {
      return true;
    } else {
      return await router.navigate(['/auth/login'])
    }
  }
}
