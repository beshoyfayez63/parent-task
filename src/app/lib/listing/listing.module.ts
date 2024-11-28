import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from "./pagination/pagination.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaginationModule,
  ],
  exports: [
    PaginationModule,
  ]
})
export class ListingModule { }
