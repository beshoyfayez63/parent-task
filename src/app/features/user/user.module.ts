import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { ListingModule } from '../../lib/listing/listing.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';


@NgModule({
  declarations: [
    ListUserComponent,
    UserCardComponent,
    CreateUserComponent,
    UpdateUserComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ListingModule
  ]
})
export class UserModule { }
