import {FormControl} from "@angular/forms";

export interface ICategory {
  id: number;
  title: string;
}

export interface IUploadForm {
  title: FormControl<string>;
  categoryId: FormControl<number>;
  file: FormControl<string>;
}
