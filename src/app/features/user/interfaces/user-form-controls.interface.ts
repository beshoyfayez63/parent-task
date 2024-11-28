import { FormControl } from "@angular/forms";

export interface IUserFormControls {
  name: FormControl<string | undefined>;
  job: FormControl<string | undefined>;
}
