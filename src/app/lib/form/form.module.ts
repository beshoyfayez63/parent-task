import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FormsModule } from '@angular/forms';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { ImageInputComponent } from './components/image-input/image-input.component';
import { CustomButtonComponent } from '../custom-button/custom-button.component';



@NgModule({
  declarations: [
    TextInputComponent,
    ErrorMessagesComponent,
    ImageInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomButtonComponent
  ],
  exports: [TextInputComponent, ImageInputComponent]
})
export class FormModule { }
