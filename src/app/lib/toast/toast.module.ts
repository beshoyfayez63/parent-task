import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './service/toast.service';



@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule,
  ],
  exports: [ToastComponent]
})
export class ToastModule {
  static forRoot(): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [
        ToastService
      ]
    }
  }
}
