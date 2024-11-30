import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { UserService } from "../../services/user.service";
import { IUsersRes } from "../../interfaces/user-res.interface";
import { ListUserComponent } from "./list-user.component";
import { of } from "rxjs";
import { PaginationComponent } from "../../../../lib/listing/pagination/components/pagination/pagination.component";
import { PaginationModule } from "../../../../lib/listing/pagination/pagination.module";
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { HttpClient } from "@angular/common/http";
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ToastService } from "../../../../lib/toast/service/toast.service";

describe('ListUserComponent', () => {
  const userRes: IUsersRes = {
    page: 1,
    per_page: 6,
    total: 12,
    total_pages: 2,
    data: [
      {
        "id": 1,
        "email": "george.bluth@reqres.in",
        "first_name": "George",
        "last_name": "Bluth",
        "avatar": "https://reqres.in/img/faces/1-image.jpg"
      },
      {
        "id": 2,
        "email": "janet.weaver@reqres.in",
        "first_name": "Janet",
        "last_name": "Weaver",
        "avatar": "https://reqres.in/img/faces/2-image.jpg"
      },
      {
        "id": 3,
        "email": "emma.wong@reqres.in",
        "first_name": "Emma",
        "last_name": "Wong",
        "avatar": "https://reqres.in/img/faces/3-image.jpg"
      },
      {
        "id": 4,
        "email": "eve.holt@reqres.in",
        "first_name": "Eve",
        "last_name": "Holt",
        "avatar": "https://reqres.in/img/faces/4-image.jpg"
      },
      {
        "id": 5,
        "email": "charles.morris@reqres.in",
        "first_name": "Charles",
        "last_name": "Morris",
        "avatar": "https://reqres.in/img/faces/5-image.jpg"
      },
      {
        "id": 6,
        "email": "tracey.ramos@reqres.in",
        "first_name": "Tracey",
        "last_name": "Ramos",
        "avatar": "https://reqres.in/img/faces/6-image.jpg"
      }
    ]
  }
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;
  let userService: UserService;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let paginationComponent: PaginationComponent;
  let router: Router;
  let toastService: ToastService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUserComponent, UserCardComponent],
      imports: [PaginationModule],
      providers: [
        ToastService,
        {provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', ['get', 'delete'])},
      ]
    })
    fixture = TestBed.createComponent(ListUserComponent);
    component = fixture.componentInstance;
    paginationComponent = fixture.debugElement.query(By.directive(PaginationComponent)).componentInstance;
    router = TestBed.inject(Router)
    toastService = TestBed.inject(ToastService);
    userService = fixture.debugElement.injector.get(UserService);
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpClient.get.and.returnValue(of(userRes));
    httpClient.delete.and.returnValue(of(true));

    fixture.detectChanges()
  })

  it('Should be truthy', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch users on ngOnInit', async () => {
    fixture.detectChanges()
    await fixture.whenStable();
    expect(httpClient.get).toHaveBeenCalledTimes(1)
  })

  it('should render user cards component correctly', async () => {
    fixture.detectChanges()
    await fixture.whenStable();
    const userCards = fixture.debugElement.queryAll(By.directive(UserCardComponent))
    expect(userCards.length).toBe(userRes.data.length)
    expect((userCards[0].componentInstance as UserCardComponent).user).toBe(userRes.data[0])
  })

  it('should render pagination correctly', fakeAsync(() => {
    tick()
    expect(component.paginationData?.totalItems).toBe(userRes.total)
    expect(component.paginationData?.totalPages).toBe(userRes.total_pages)
  }))

  it('should monitor pagination page', async () => {
    component.paginationComponent?.onPageChanged.emit(1)
    fixture.detectChanges()
    expect(paginationComponent.totalResults).toBe(component.paginationData!.totalItems)
    expect(paginationComponent.totalPages).toBe(component.paginationData!.totalPages!)
  })

  it('should go to user page to view profile', async () => {
    spyOn(router, 'navigate');
    fixture.detectChanges()
    await fixture.whenStable();
    const userCards = fixture.debugElement.queryAll(By.directive(UserCardComponent))
    userCards[0].triggerEventHandler('click', userRes.data[0]);
    expect(router.navigate).toHaveBeenCalledOnceWith(['/users/view', 1])
  })

  it('should go to user edit to edit user', async () => {
    spyOn(router, 'navigate');
    fixture.detectChanges()
    await fixture.whenStable();
    const userCards = fixture.debugElement.queryAll(By.directive(UserCardComponent))
    userCards[0].triggerEventHandler('onEdit', userRes.data[0].id);
    expect(router.navigate).toHaveBeenCalledOnceWith(['/users/edit', 1])
  })

  it('should delete user if onDelete triggered', async () => {
    spyOn(toastService, 'show');
    fixture.detectChanges()
    await fixture.whenStable();
    const totalItems = component.paginationData?.totalItems ?? 0;
    const userCards = fixture.debugElement.queryAll(By.directive(UserCardComponent))
    userCards[0].triggerEventHandler('onDelete', userRes.data[0]);
    expect(toastService.show).toHaveBeenCalledTimes(1)
    expect(paginationComponent.totalResults).toBe(totalItems - 1)
  })
})
