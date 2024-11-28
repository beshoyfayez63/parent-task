import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../services/user.service";
import { IUser } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../../lib/listing/pagination/components/pagination/pagination.component';
import { IPagination } from '../../../../lib/listing/pagination/types/IPagination';
import { debounce, distinctUntilChanged, startWith, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent implements AfterViewInit, OnDestroy {

  router = inject(Router);
  userService = inject(UserService);

  @ViewChild(PaginationComponent) paginationComponent?:IPagination;

  private destroy$ = new Subject<void>()

  ngAfterViewInit(): void {
    this.paginationComponent?.onPageChanged
    .pipe(
      startWith(1),
      distinctUntilChanged(),
      switchMap(page => this.userService.fetchUsers(page)),
      takeUntil(this.destroy$)
    )
    .subscribe(data => {
      this.paginationComponent?.setPagination({
        totalItems: data.total,
        totalPages: data.total_pages,
        rpp: data.per_page
      })
    });
  }

  trackUser(_: number, item: IUser) {
    return item.id;
  }

  async goToUserDetailsPage(id: string | number) {
    await this.router.navigate(['/users', id])
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
