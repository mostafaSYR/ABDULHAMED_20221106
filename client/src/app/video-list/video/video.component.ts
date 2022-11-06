import {Component, Input, OnInit} from '@angular/core';
import {IVideo} from "../interfaces";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @Input() video?: IVideo;

  constructor() {
  }

  ngOnInit(): void {
  }

  playVideo(): void {
  }
}
