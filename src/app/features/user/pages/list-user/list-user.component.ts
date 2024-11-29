import { AfterViewInit, Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from "../../services/user.service";
import { IUser } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../../lib/listing/pagination/components/pagination/pagination.component';
import { IPagination, IPaginationSettings } from '../../../../lib/listing/pagination/types/IPagination';
import { distinctUntilChanged, finalize, Subject, switchMap, takeUntil } from 'rxjs';
import { IUsersRes } from '../../interfaces/user-res.interface';
import { ToastService } from '../../../../lib/toast/service/toast.service';
import { IToast } from '../../../../lib/toast/interfaces/toast.interface';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent implements OnInit, AfterViewInit, OnDestroy {

  router = inject(Router);
  userService = inject(UserService);
  toastService = inject(ToastService);
  paginationData?: IPaginationSettings;

  loading = true;

  @ViewChild(PaginationComponent) paginationComponent?:IPagination;
  @ViewChild('success') successToast?: TemplateRef<IToast>

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.fetchUsers(1).subscribe((data) => this.setPagination(data));
  }

  ngAfterViewInit(): void {
    this.monitorPagination();
  }

  private monitorPagination() {
    this.paginationComponent?.onPageChanged
    .pipe(
      distinctUntilChanged(),
      switchMap(page => this.fetchUsers(page)),
      takeUntil(this.destroy$),
    )
    .subscribe(data => {
      this.setPagination(data)
    });
  }

  private setPagination(data: IUsersRes) {
    this.paginationData = {
      totalItems: data.total,
      totalPages: data.total_pages,
    }
    this.paginationComponent?.setPagination(this.paginationData)
  }

  private fetchUsers(page = 1) {
    this.loading = true;
    return this.userService.fetchUsers(page).pipe(finalize(() => this.loading = false));
  }

  trackUser(_: number, item: IUser) {
    return item.id;
  }

  onEdit(userId: number) {
    this.router.navigate(['/users/edit', userId])
  }

  async goToUserDetailsPage(id: string | number) {
    await this.router.navigate(['/users/view', id])
  }

  onUserDeleted(user: IUser) {
    this.userService.deleteUser(user.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(_ => {
      this.toastService.show({className: 'bg-success', body: 'User has been deleted.'});
      this.paginationData!.totalItems--;
      this.paginationComponent?.setPagination({
        ...this.paginationData!,
      })
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
