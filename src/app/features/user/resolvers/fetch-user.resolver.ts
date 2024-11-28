import { ResolveFn } from '@angular/router';
import { map, Observable } from "rxjs";
import { inject } from "@angular/core";
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';


export const fetchUserResolver: ResolveFn<Observable<IUser>> = (route, _) => {
  const userService = inject(UserService);
  return userService.getUserDetails(route.params['id']).pipe(map(data => data.data));
};
