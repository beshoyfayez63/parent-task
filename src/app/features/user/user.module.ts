import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { PaginationModule } from '../../lib/listing/pagination/pagination.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../../lib/form/form.module';
import { CustomButtonComponent } from '../../lib/custom-button/custom-button.component';
import { LoadingSpinnerComponent } from '../../lib/loading-spinner/loading-spinner.component';
import { BackButtonComponent } from '../../lib/back-button/back-button.component';


@NgModule({
  declarations: [
    ListUserComponent,
    UserCardComponent,
    CreateUserComponent,
    UpdateUserComponent,
    ViewUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PaginationModule,
    ReactiveFormsModule,
    FormModule,
    BackButtonComponent,
    CustomButtonComponent,
    LoadingSpinnerComponent
  ]
})
export class UserModule { }
