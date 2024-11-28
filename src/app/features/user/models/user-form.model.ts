import { FormControl, FormGroup } from "@angular/forms";
import { IUserFormControls } from "../interfaces/user-form-controls.interface";
import { IUser } from "../interfaces/user.interface";

export class UserFormModel {
  formGroup!: FormGroup<IUserFormControls>

  constructor(private user?: IUser) {
    this.initForm()
  }

  private initForm() {
    this.formGroup = new FormGroup<IUserFormControls>({
      name: new FormControl(this.user?.first_name, {nonNullable: true}),
      job: new FormControl(this.user?.last_name, {nonNullable: true}),
    })
  }
}
