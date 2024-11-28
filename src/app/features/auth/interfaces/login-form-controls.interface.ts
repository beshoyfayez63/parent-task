import { FormControl } from "@angular/forms";

export interface ILoginFormControls {
  email: FormControl<string | undefined>;
  password: FormControl<string | undefined>;
}
