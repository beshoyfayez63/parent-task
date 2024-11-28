import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListingComponent } from './components/card-listing/card-listing.component';



@NgModule({
  declarations: [
    CardListingComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardListingComponent,
  ]
})
export class CardListingModule { }
