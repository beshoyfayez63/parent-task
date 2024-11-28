import { Injectable } from "@angular/core";
import { IToast } from "../interfaces/toast.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class ToastService {
  private toasts = new BehaviorSubject<IToast[]>([]);
  readonly toasts$ = this.toasts.asObservable();

  show(toast: IToast) {
    this.toasts.next([...this.toasts.value, toast]);
  }

  remove(toast: IToast) {
    const toasts = [...this.toasts.value];
    this.toasts.next(toasts.filter(t => t !== toast));
  }
}
