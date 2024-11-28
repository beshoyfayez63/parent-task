import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		PaginationComponent,
	],
	exports: [
		PaginationComponent
	],
	imports: [
		CommonModule,
    NgbPaginationModule,
    FormsModule,
	]
})
export class PaginationModule { }
