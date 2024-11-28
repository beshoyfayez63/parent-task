import { Component, inject } from '@angular/core';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  host: {
    class: 'toast-container position-fixed end-0 p-3',
    style: 'z-index: 1200; top: 3rem'
  }
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
