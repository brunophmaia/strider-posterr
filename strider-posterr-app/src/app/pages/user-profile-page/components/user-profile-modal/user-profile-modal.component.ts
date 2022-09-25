import { Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Subscription } from 'rxjs';
import { Post } from 'src/app/common/models/post.model';
import { UserInfo } from 'src/app/common/models/user-info.model';
import { PostRestService } from 'src/app/common/rest-services/post-rest-service';
import { UserRestService } from 'src/app/common/rest-services/user-rest.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { DeviceService } from 'src/app/common/services/device/device.service';
import { insertAtUsername } from 'src/app/common/util/common.util';
import { getFullDate } from 'src/app/common/util/date.util';

@Component({
  selector: 'posterr-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnDestroy {

  @ViewChild('modalUserProfile', { read: ElementRef }) public modalUserProfile: ElementRef<any>;

  userInfo: UserInfo;
  username: string;
  formattedUsername: string;
  joinedDate: string;
  followingInfo: boolean;
  posts: Array<Post>;
  postWriteEnabled: boolean = false;
  eventCleanPost: Subject<void> = new Subject<void>();
  subs: Array<Subscription> = [];

  constructor(@Inject(MAT_DIALOG_DATA) username: string,
              public deviceService: DeviceService,
              public dialogRef: MatDialogRef<UserProfileModalComponent>,
              private userRestService: UserRestService,
              private postRestService: PostRestService,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
    this.username = username;
    this.loadData();
  }

  loadData() {
    this.loadUserInfo();
    this.loadFollowingInfo();
    this.loadUsersPosts();
  }

  loadUserInfo(){
    this.subs.push(
      this.userRestService.get(this.username).subscribe(userInfo => {
        this.userInfo = userInfo;
        this.username = userInfo.username;
        this.formattedUsername = insertAtUsername(userInfo.username);
        this.joinedDate = getFullDate(userInfo.joinedDate, true);
      })
    );
  }

  loadFollowingInfo() {
    if(this.authService.getLoggedUsername() != this.username) {
      this.subs.push(
        this.userRestService.getFollowingStatus(this.authService.getLoggedUsername(), this.username).subscribe(following => {
          this.followingInfo = following;
        })
      );
    }
  }

  loadUsersPosts(){
    this.subs.push(
      this.postRestService.getByUser(this.username).subscribe(posts => {
        this.posts = posts;
      })
    );
  }

  reposted(){
    this.loadData();
    this.scrollTop();
  }

  followAction(){
    const subFollow = this.followingInfo ? this.userRestService.unfollow(this.authService.getLoggedUsername(), this.username) : 
                                                                   this.userRestService.follow(this.authService.getLoggedUsername(), this.username);
    this.subs.push(subFollow.subscribe(() => {
        const message = this.followingInfo ? "Unfollowed successfully!" : "Following successfully!";

        this.snackBar.open($localize`${message}`, "X", {
          panelClass: "success-post",
          verticalPosition: "top",
          duration: 5000
        });

        this.loadUserInfo();
        this.loadFollowingInfo();
      })
    );
  }

  createPost(post: Post){
    post.author = this.username;

    this.subs.push(
      this.postRestService.post(post).subscribe({
        next: () => {
          this.snackBar.open($localize`${"Post created successfully!"}`, "X", {
            panelClass: "success-post",
            verticalPosition: "top",
            duration: 5000
          });
          this.eventCleanPost.next();
          this.loadData();
          this.postWriteEnabled = false;
          this.scrollTop();
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

  scrollTop(){
    if(this.modalUserProfile?.nativeElement?.parentElement?.parentElement) {
      this.modalUserProfile.nativeElement.parentElement.parentElement.scrollTop = 0;
    }
  }

  close(){
    this.dialogRef.close();
  }

  ngOnDestroy(){
    this.subs.forEach(s => s.unsubscribe());
  }
}
