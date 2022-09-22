import { Component } from '@angular/core';
import { Post } from 'src/app/common/models/post.model';
import { DeviceService } from 'src/app/common/services/device/device.service';

@Component({
  selector: 'posterr-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  posts: Array<Post> = [];

  constructor(public deviceService: DeviceService){
  }

}
