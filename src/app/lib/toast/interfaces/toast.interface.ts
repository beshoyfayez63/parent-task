import { TemplateRef } from "@angular/core";

export interface IToast {
  header?: string;
  body?: string;
  templateRef?: TemplateRef<IToast>;
  delay?: number,
  className?: string;
}

type ToastType = 'success' | 'error';
