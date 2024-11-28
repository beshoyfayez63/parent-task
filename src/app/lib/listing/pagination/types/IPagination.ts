import { EventEmitter } from "@angular/core";

export interface IPagination {
  onPageChanged: EventEmitter<number>;
  setPagination: (settings: IPaginationSettings) => void;
  getCurrentPage: () => number;
  total?: number;
  rpp?: number;
  changePage: (page: number) => void;
}

export interface IPaginationSettings {
  totalItems: number;
  totalPages: number;
  rpp: number;
}
