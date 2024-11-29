import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { fetchUserResolver } from './resolvers/fetch-user.resolver';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';

const routes: Routes = [
  // {path: '', redirectTo: '/users', pathMatch: 'full'},
  // {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: '', component: ListUserComponent},
  {
    path: 'edit/:id',
    component: UpdateUserComponent,
    resolve: {
      user: fetchUserResolver
    }
  },
  {
    path: 'create',
    component: CreateUserComponent,
  },
  {
    path: 'view/:id',
    component: ViewUserComponent,
    resolve: {
      user: fetchUserResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
