import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IUserFormControls } from "../interfaces/user-form-controls.interface";
import { IUser, IUserDto } from "../interfaces/user.interface";

export class UserFormModel {
  formGroup!: FormGroup<IUserFormControls>

  constructor(private user?: IUser) {
    this.initForm()
  }

  private initForm() {
    this.formGroup = new FormGroup<IUserFormControls>({
      firstName: new FormControl(
        this.user?.first_name,
        {
          validators: [Validators.required],
          nonNullable: true
        }
      ),
      lastName: new FormControl(
        this.user?.last_name,
        {
          validators: [Validators.required],
          nonNullable: true
        }
      ),
      email: new FormControl(
        this.user?.email,
        {
          validators: [Validators.required, Validators.email],
          nonNullable: true
        }
      ),
      avatar: new FormControl(undefined)
    })
  }

  static toFormData(value: IUserDto) {
    const formData = new FormData();
    for(const key in value) {
      const _value = value[key as keyof typeof value]
      if(_value) formData.append(key, _value);
    }
    return formData;
  }
}
