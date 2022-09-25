import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Post } from 'src/app/common/models/post.model';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { DeviceService } from 'src/app/common/services/device/device.service';
import { allPath, followingPath } from 'src/app/common/util/common.util';
import { ScrollContentService } from 'src/app/pages/master-page/services/scroll-content.service';
import { HomePageStateService, PostFilterType } from '../../state/home-page-state.service';

@Component({
  selector: 'posterr-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  postFilterType = PostFilterType;
  posts$: Observable<Array<Post>>;
  eventCleanPost: Subject<void> = new Subject<void>();
  loggedUser: string;
  subs: Array<Subscription> = [];

  constructor(public deviceService: DeviceService,
              public homepageState: HomePageStateService,
              public authService: AuthService,
              private scrollContentService: ScrollContentService,
              private router: Router,
              private snackBar: MatSnackBar){
  }

  ngOnInit(){
    this.posts$ = this.homepageState.posts$;
    this.loggedUser = this.authService.getLoggedUsername();
    this.setPostsTypeFromRoute();
  }

  onChangeToggle(valueChange: MatButtonToggleChange){
    this.router.navigate([valueChange.value == PostFilterType.ALL ? allPath : followingPath]);
    this.scrollContentService.scrollTop();
  }

  reposted(){
    this.homepageState.reloadPosts();
    this.scrollContentService.scrollTop();
  }

  createPost(post: Post){

    this.subs.push(
      this.homepageState.createPost(post).subscribe({
        next: () => {
          this.snackBar.open($localize`${"Post created successfully!"}`, "X", {
            panelClass: "success-post",
            verticalPosition: "top",
            duration: 5000
          });
          this.eventCleanPost.next();
          this.scrollContentService.scrollTop();
        },
        error: (err => {
          this.snackBar.open(err, "X", {
            panelClass: "error-post",
            verticalPosition: "top"
          });
        })
      })
    )
  }

  private setPostsTypeFromRoute() {
    switch(this.router.url) {
      case `/${allPath}`:
        this.homepageState.setPostTypeFromPath(PostFilterType.ALL);
        break;
      case `/${followingPath}`:
        this.homepageState.setPostTypeFromPath(PostFilterType.FOLLOWING);
        break;
      default:
        this.homepageState.setPostTypeFromPath(PostFilterType.ALL, true);
        break;
    }
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}