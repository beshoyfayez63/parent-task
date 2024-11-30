import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [FormsModule, NgbPaginationModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.page).toBe(1);
    expect(component.totalResults).toBe(0);
    expect(component.totalPages).toBe(0);
    expect(component.rpp).toBe(6);
  });

  // it('should emit page change event when changePage is called', () => {
  //   spyOn(component.onPageChanged, 'emit');
  //   component.totalPages = 5;
  //   spyOn(component, 'changePage').withArgs(3)
  //   // component.changePage(3);
  //   // fixture.detectChanges();

  //   expect(component.page).toBe(3);
  //   expect(component.onPageChanged.emit).toHaveBeenCalledWith(3);

  //   component.changePage(6);
  //   expect(component.page).toBe(5);
  //   expect(component.onPageChanged.emit).toHaveBeenCalledWith(5);
  // });

  // it('should clamp page input to totalPages', () => {
  //   component.totalPages = 4;
  //   fixture.detectChanges();

  //   const inputEl = fixture.debugElement.query(By.css('#paginationInput')).nativeElement;
  //   inputEl.value = 5;
  //   inputEl.dispatchEvent(new Event('input'));
  //   inputEl.dispatchEvent(new Event('change'));

  //   fixture.detectChanges();

  //   expect(component.page).toBe(4); // Should clamp to max value
  //   expect(inputEl.value).toBe('4');
  // });

  // it('should set pagination and calculate totalPages correctly', () => {
  //   component.setPagination({ totalItems: 25, totalPages: 5 });
  //   expect(component.totalResults).toBe(25);
  //   expect(component.totalPages).toBe(5);
  // });

  // it('should render the correct page and total pages in the template', () => {
  //   component.page = 2;
  //   component.totalPages = 10;
  //   fixture.detectChanges();

  //   const inputEl = fixture.debugElement.query(By.css('#paginationInput')).nativeElement;
  //   const descriptionEl = fixture.debugElement.query(By.css('#paginationDescription')).nativeElement;

  //   expect(inputEl.value).toBe('2');
  //   expect(descriptionEl.textContent.trim()).toBe('of 10');
  // });

  // it('should handle ngModelChange and call changePage', () => {
  //   spyOn(component, 'changePage');

  //   component.totalPages = 5;
  //   fixture.detectChanges();

  //   const inputEl = fixture.debugElement.query(By.css('#paginationInput')).nativeElement;
  //   inputEl.value = 3;
  //   inputEl.dispatchEvent(new Event('input'));
  //   inputEl.dispatchEvent(new Event('change'));

  //   expect(component.changePage).toHaveBeenCalledWith(3);
  // });
});
