import { Component, inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { map, Observable } from "rxjs";
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {

  private activatedRoute = inject(ActivatedRoute);

  user: Observable<IUser> = this.activatedRoute.data.pipe(map((data) => data['user']));
}
