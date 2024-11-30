import { TestBed } from "@angular/core/testing"
import { LocalStorageService } from "./localstorage.service"

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    })
    service = TestBed.inject(LocalStorageService);
  })

  it('return truthy', () => {
    expect(service).toBeTruthy();
  })

  it('get and set items with string value to localstorage', () => {
    service.set('test', 'abc');
    const token = service.get<string>('test');
    expect(token).toBe('abc');
  })

  it('get and set items with object value to localstorage', () => {
    const obj = {a: 1}
    service.set('test', obj);
    const test = service.get<object>('test');
    expect(test).toEqual(obj);
  })

  it('remove from localstorage', () => {
    service.set('token', 'bb');
    service.remove('token');
    expect(service.get('token')).toBe(null)
  })
})
