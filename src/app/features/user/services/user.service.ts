import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { IUsersRes } from '../interfaces/user-res.interface';
import { IUserDetailRes } from '../interfaces/user-details-res.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  fetchUsers(page: number = 1) {
    return this.http.get<IUsersRes>(`${environment.baseUrl}/users?page=${page}`)
  }

  getUserDetails(id: string | number) {
    return this.http.get<IUserDetailRes>(`${environment.baseUrl}/users/${id}`);
  }
}
