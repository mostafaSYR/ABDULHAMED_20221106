import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, tap} from "rxjs";
import {IVideo} from "../video-list/interfaces";
import {ICategory} from "../upload/interfaces";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor( private http: HttpClient) { }

  getVideos(): Observable<IVideo[]> {
    return this.http.get<any>('http://localhost:3000/videos').pipe(
      map((response) => {
       return response.map((obj) => {
          return {
            title: obj.title,
            thumbnail: obj.file_url,
            category: obj.category_name,
            file: obj.file_url,
          } as IVideo;
        });
      }),
      catchError((error) => {
        console.log(error);
        return [];
      }),
    );
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<any>('http://localhost:3000/categories').pipe(
      map((response) => {
        return response.map((obj) => {
          return {
            id: obj.id,
            title: obj.name,
          } as ICategory;
        });
      }),
      catchError((error) => {
        console.log(error);
        return [];
      }),
    );
  }

  uploadVideo(formData: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:3000/videos', formData)
  }
}
