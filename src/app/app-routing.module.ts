import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardFn } from './core/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {
    path: 'users',
    loadChildren: () => import('./features/user/user.module').then(({UserModule}) => UserModule),
    canActivate: [authGuardFn]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(({AuthModule}) => AuthModule),
    canActivate: [authGuardFn]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
