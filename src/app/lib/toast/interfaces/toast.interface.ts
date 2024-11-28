import { TemplateRef } from "@angular/core";

export interface IToast {
  header?: string;
  body: string;
  delay?: number,
  className?: string;
}

type ToastType = 'success' | 'error';
