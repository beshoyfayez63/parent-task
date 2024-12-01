import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputComponent } from './text-input.component';
import { FormModule } from '../../form.module';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'dummy',
  template: `
    <app-text-input [formControl]="formControl"></app-text-input>
  `
})
class TestTextInputComponent {
  formControl = new FormControl<any>(undefined, {validators: [Validators.required]});
}

describe('TextInputComponent', () => {
  let component: TestTextInputComponent;
  let textInputComponent: TextInputComponent;
  let fixture: ComponentFixture<TestTextInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextInputComponent, TestTextInputComponent],
      imports: [FormModule, ReactiveFormsModule]
    })

    fixture = TestBed.createComponent(TestTextInputComponent);
    textInputComponent = fixture.debugElement.children[0].componentInstance;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should touched on blur', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    input.dispatchEvent(new Event('blur'))
    expect(component.formControl.touched).toBe(true)
  });

  it('should touched on input', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    input.dispatchEvent(new Event('input'))
    expect(component.formControl.touched).toBe(true)
  });

  it('should change on input event', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'))
    expect(component.formControl.value).toBe('test')
  });

  it('should have is-invalid class', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    expect(input.classList).toContain('is-invalid')
  });
});
