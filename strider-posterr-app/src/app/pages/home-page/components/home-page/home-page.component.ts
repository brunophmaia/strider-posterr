import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/common/models/post.model';
import { DeviceService } from 'src/app/common/services/device/device.service';
import { allPath, followingPath } from 'src/app/common/util/common.util';
import { HomePageStateService, PostFilterType } from '../../state/home-page-state.service';

@Component({
  selector: 'posterr-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  postFilterType = PostFilterType;
  posts$: Observable<Array<Post>>;

  constructor(public deviceService: DeviceService,
              public homepageState: HomePageStateService,
              private router: Router){
  }

  ngOnInit(){
    this.posts$ = this.homepageState.posts$;
    this.setPostsTypeFromRoute();
  }

  onChangeToggle(valueChange: MatButtonToggleChange){
    this.router.navigate([valueChange.value == PostFilterType.ALL ? allPath : followingPath]);
  }

  private setPostsTypeFromRoute() {
    switch(this.router.url) {
      case `/${allPath}`:
        this.homepageState.setPostTypeFromPath(PostFilterType.ALL);
        break;
      case `/${followingPath}`:
        this.homepageState.setPostTypeFromPath(PostFilterType.FOLLOWING);
        break;
    }
  }
}