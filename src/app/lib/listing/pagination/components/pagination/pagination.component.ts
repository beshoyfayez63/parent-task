import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { IPagination, IPaginationSettings } from "../../types/IPagination";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  host: {
    class: 'pagination'
  }
})
export class PaginationComponent implements IPagination {

  page = 1;
  totalResults = 0;
  totalPages = 0;
  clipPages = 0;
  rpp = 6;

  @Output() onPageChanged = new EventEmitter<number>();

  goToPrevPage() {
    if(this.page > 1) {
      this.changePage(this.page - 1);
    }
  }

  goToNextPage() {
    // to make sure the next page exist, may be page is equal 1 and totalPages is 1 also
    if(this.page + 1 <= this.totalPages) {
      this.changePage(this.page + 1);
    }
  }

  changePage(page: number) {
    this.page = page;
    this.onPageChanged.emit(page);
  }

  setPagination(settings: IPaginationSettings) {
    this.totalPages = settings.totalPages;
    this.totalResults = settings.totalItems;
    this.rpp = settings.rpp;
    this.clipPages = Math.ceil(
      this.totalPages - (this.totalPages - (this.page + 1)) / 2
    );
  }

  getCurrentPage() {
    return this.page;
  }

  goToFirstPage(){
    if(this.page > 1){
      this.changePage( 1);
    }
  }

  goToLastPage(){
    if(this.page < this.totalPages){
      this.changePage(this.totalPages);
    }
  }
}
