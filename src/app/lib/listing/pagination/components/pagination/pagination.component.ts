import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
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

  @ViewChild('input') input?: ElementRef<HTMLInputElement>

  @Output() onPageChanged = new EventEmitter<number>();

  changePage(page: number) {
    this.page = Math.min(page ?? 1, this.totalPages);
    // Using this line to enforce user to enter a value in input text less than or equal totalPages
    this.input!.nativeElement.value! = this.page.toString();
    this.onPageChanged.emit(this.page);
  }

  setPagination(settings: IPaginationSettings) {
    this.totalResults = settings.totalItems;
    this.totalPages = Math.ceil(this.totalResults / this.rpp);
    if(this.totalPages !== settings.totalPages) {
      this.onPageChanged.emit(this.page);
    }
  }

  getCurrentPage() {
    return this.page;
  }
}
