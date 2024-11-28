import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout()
    this.router.navigate(['auth/login'])
  }
}
