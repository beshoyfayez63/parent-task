import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UserCardComponent } from "./user-card.component"
import { IUser } from "../../interfaces/user.interface";
import { By } from "@angular/platform-browser";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  const user: IUser = {
    id: 1,
    avatar: 'test',
    email: 'b@b.com',
    first_name: 'b',
    last_name: 'c'
  }
  let modalService: NgbModal;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCardComponent],
      providers: [NgbModal]
    })
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal)
  })

  it('Should be truthy', () => {
    expect(component).toBeTruthy()
  })

  it('expect user to be input', async () => {
    fixture.componentRef.setInput('user', user);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.user).toEqual(user);
  })

  it('should have edit output with userId as number',async () => {
    let _userId: number | undefined;
    component.onEdit.subscribe(userId => _userId = userId)
    const actions = fixture.debugElement.query(By.css('.user-actions')).children;
    component.user = user;
    actions[1].triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();
    await fixture.whenStable()
    expect(_userId).toBe(user.id)
  })

  it('should have delete output with user object when confirm deletion', async () => {
    let userObj: IUser | undefined;
    spyOn(modalService, 'open').and.returnValue({
      result: Promise.resolve(true),
      componentInstance: {title: 'test'}
    } as NgbModalRef)
    component.onDelete.subscribe(user => userObj = user);
    component.user = user;
    const actions = fixture.debugElement.query(By.css('.user-actions')).children;
    actions[0].triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(userObj).toEqual(component.user)
  })

  it('should have not call delete output with user object when cancel deletion', async () => {
    let userObj: IUser | undefined;
    spyOn(modalService, 'open').and.returnValue({
      result: Promise.reject(),
      componentInstance: {title: 'test'}
    } as NgbModalRef)
    component.onDelete.subscribe(user => userObj = user);
    component.user = user;
    const actions = fixture.debugElement.query(By.css('.user-actions')).children;
    actions[0].triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(userObj).toBeUndefined()
  })

  it('should render user correctly on html', () => {
    component.user = user;
    const userDetails = fixture.debugElement.query(By.css('.user-details'))
    const userImg: HTMLImageElement = userDetails.query(By.css('img')).nativeElement;
    const detailItems = userDetails.queryAll(By.css('.detail-item'));
    const renderedId: HTMLSpanElement = detailItems[0].query(By.css('.value')).nativeElement;
    const fullName: HTMLSpanElement = detailItems[1].query(By.css('.value')).nativeElement;
    const email: HTMLSpanElement = detailItems[2].query(By.css('.value')).nativeElement;
    fixture.detectChanges();
    expect(detailItems.length).toBe(3);
    expect(renderedId.textContent).toBe(component.user.id.toString());
    expect(fullName.textContent).toBe(`${component.user.first_name!} ${component.user.last_name}`);
    expect(email.textContent).toBe(component.user.email!);
    expect(userImg.src).toContain(component.user.avatar!);
  })
})
