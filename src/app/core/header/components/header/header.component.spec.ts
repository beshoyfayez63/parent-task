import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { provideRouter, Router, RouterLinkActive, RouterLinkWithHref, RouterModule } from "@angular/router";
import { AuthService } from "../../../../features/auth/services/auth.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ListUserComponent } from "../../../../features/user/pages/list-user/list-user.component";
import { CreateUserComponent } from "../../../../features/user/pages/create-user/create-user.component";
import { By } from "@angular/platform-browser";
import { LocalStorageService } from "../../../services/localstorage.service";
import { RouterTestingHarness } from "@angular/router/testing";


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let router: Router;
  let authService: AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterModule],
      providers: [
        AuthService,
        LocalStorageService,
        provideRouter([
          {path: 'users', component: ListUserComponent},
          {path: 'users/create', component: CreateUserComponent}
        ]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService)
    const localStorageService = TestBed.inject(LocalStorageService);
    router = TestBed.inject(Router);

    fixture.detectChanges();

    localStorageService.set('token', 'abc');
    spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('Should logout when press button', () => {
    const logoutBtn = fixture.debugElement.query(By.css('button'));
    spyOn(authService, 'logout');
    logoutBtn.triggerEventHandler('click');
    expect(authService.logout).toHaveBeenCalledTimes(1)
  })

  it('should navigate to users if press users link', fakeAsync(() => {
    router.navigateByUrl('/users/create');
    tick();

    const links = fixture.debugElement.queryAll(By.css('a'));
    links[0].nativeElement.click()
    tick();

    expect(router.url).toBe(`/users`);
  }));

  it('should navigate to user create if press create link', fakeAsync(() => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    links[1].nativeElement.click()
    tick();

    expect(router.url).toBe(`/users/create`);
  }));

  it('test active link', fakeAsync(() => {
    router.navigateByUrl('/users/create');
    tick();

    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links[1].injector.get(RouterLinkActive).isActive).toBeTrue()
  }))
});
