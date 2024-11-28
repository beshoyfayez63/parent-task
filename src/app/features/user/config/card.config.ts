import { Observable, of } from "rxjs";
import { ICardListConfig } from "../../../lib/listing/card-listing/types/card-list-config.interface";
import { IUsersRes } from "../interfaces/user-res.interface";
import { IUser } from "../interfaces/user.interface";
import { IUserListComponent } from "../interfaces/user-list-component.interface";

export class CardConfig implements ICardListConfig<IUsersRes, IUser[]> {
  constructor(private parent: IUserListComponent) {}

  getData(page: number): Observable<IUsersRes> {
    return this.parent.userService.fetchUsers(page)
  }

  dataMapper(res: IUsersRes): Observable<IUser[]> {
    return of(res.data);
  }

  paginationMapper(res: IUsersRes) {
    return {
      totalItems: res.total,
      totalPages: res.total_pages,
      rpp: res.per_page
    }
  }
}
