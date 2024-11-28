import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from "./pagination/pagination.module";
import { CardListingModule } from "./card-listing/card-listing.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaginationModule,
    CardListingModule
  ],
  exports: [
    PaginationModule,
    CardListingModule
  ]
})
export class ListingModule { }
