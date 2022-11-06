import {Component, OnInit} from '@angular/core';
import {IVideo} from "../interfaces";
import {Router} from "@angular/router";
import {VideoService} from "../../services/video.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  protected videos: IVideo[] = [];

  constructor(private router: Router, private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.videoService.getVideos()
      .subscribe({
        next: (response) => this.videos = response,
        error: (error) => console.log(error),
      });
  }

  navigateToUpload(): Promise<boolean> {
    return this.router.navigate(['upload']);
  }
}
