import { Component, EventEmitter, Output } from '@angular/core';
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
  rpp = 6;

  @Output() onPageChanged = new EventEmitter<number>();

  changePage(page: number) {
    console.log(page);
    this.page = page;
    this.onPageChanged.emit(page);
  }

  setPagination(settings: IPaginationSettings) {
    this.totalPages = settings.totalPages;
    this.totalResults = settings.totalItems;
    this.rpp = settings.rpp;
  }

  getCurrentPage() {
    return this.page;
  }
}
