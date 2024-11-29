import { FormControl } from "@angular/forms";

export interface IUserFormControls {
  firstName: FormControl<string | undefined>;
  lastName: FormControl<string | undefined>;
  email: FormControl<string | undefined>;
  avatar: FormControl<File | undefined | null>
}
