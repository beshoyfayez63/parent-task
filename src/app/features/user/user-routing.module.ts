import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { fetchUserResolver } from './resolvers/fetch-user.resolver';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';

const routes: Routes = [
  // {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'users', component: ListUserComponent},
  {
    path: 'users/:id',
    component: ViewUserComponent,
    resolve: {
      user: fetchUserResolver
    }
  },
  {
    path: 'edit-user/:id',
    component: UpdateUserComponent,
    resolve: {
      user: fetchUserResolver
    }
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
