import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BaseInput } from '../../models/base-input';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImageInputComponent,
      multi: true
    }
  ]
})
export class ImageInputComponent extends BaseInput<File> {

  url = environment.img;
  file?: File | null;
  fileBase64?: string;

  @Input() imageSrc?: string | null;

  @ViewChild('fileInput', { static: false })
  fileInput?: ElementRef<HTMLInputElement>;

  override writeValue(value: undefined | null): void {
    this.value = value;
  }

  addImage() {
    this.fileInput?.nativeElement.click();
  }

  async filePickerChanged(event: any) {
    this.imageSrc = null
    const file = (event.target as HTMLInputElement).files?.[0];
    this.file = file;
    this.fileBase64 = await this.showFilePreview();
    this.value = this.file;
    this.onChange(file);
  }

  showFilePreview(): Promise<any> {
    return new Promise((resolve, _) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.readAsDataURL(this.file!);
    });
  }
}
