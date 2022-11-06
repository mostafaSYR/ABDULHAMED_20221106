import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ICategory, IUploadForm} from "../interfaces";
import {FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {VideoService} from "../../services/video.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {

  form: FormGroup<IUploadForm>;

  categories: ICategory[] = [
    {id: 1, title: 'Education'},
    {id: 2, title: 'Recipe'},
    {id: 3, title: 'Entertainment'},
  ];

  uploaded = false;

  error = '';

  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private videoService: VideoService,
  ) {
  }

  ngOnInit(): void {
    this.videoService.getCategories()
      .subscribe({
        next: (response) => { this.categories = response },
        error: (error) => console.log(error),
      });
    this.form = this.formBuilder.group(
      {
        title: this.formBuilder.control('', [Validators.required]),
        categoryId: this.formBuilder.control(0, [Validators.required]),
        file: this.formBuilder.control('', [Validators.required]),
      }
    );
  }

  uploadFile(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.form.patchValue({file});
    }
  }

  navigateToListVideos(): Promise<boolean> {
    return this.router.navigate(['list']);
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.form.value.title);
    formData.append('category_id', this.form.value.categoryId.toString());
    formData.append('file', this.form.value.file);
    this.videoService.uploadVideo(formData)
      .pipe(
        tap(() => this.uploaded = true)
      )
      .subscribe(
        {
          next: (response) => console.log(response),
          error: (error) => this.error = error.toString(),
        });
  }
}
