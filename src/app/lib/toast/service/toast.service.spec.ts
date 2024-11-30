import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ToastService } from "./toast.service";
import { IToast } from "../interfaces/toast.interface";

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({providers: [ToastService]});
    service = TestBed.inject(ToastService);
  })

  it('should be truthy', () => {
    expect(ToastService).toBeTruthy()
  })

  it('should show a toast', fakeAsync(() => {
    // spyOn(service, 'show').withArgs({className: 'bg-success', body: 'Test'}).and.callThrough();
    service.show({className: 'bg-success', body: 'Test'})
    service.toasts$.subscribe(toasts => {
      tick();
      expect(toasts.length).toBe(1)
    })
  }))
  it('should remove a toast', fakeAsync(() => {
    const toast1: IToast = {className: 'bg-success', body: 'Test'}
    const toast2: IToast = {className: 'bg-success', body: 'Test'}
    service.show(toast1)
    service.show(toast2)
    service.remove(toast1)
    service.toasts$.subscribe(toasts => {
      tick();
      expect(toasts.length).toBe(1)
    })
  }))
})
