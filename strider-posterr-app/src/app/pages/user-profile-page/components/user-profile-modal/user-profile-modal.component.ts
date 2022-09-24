import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/common/models/user-info.model';
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

  userInfo: UserInfo;
  username: string;
  formattedUsername: string;
  joinedDate: string;
  followingInfo: boolean;
  subs: Array<Subscription> = [];

  constructor(@Inject(MAT_DIALOG_DATA) username: string,
              public deviceService: DeviceService,
              public dialogRef: MatDialogRef<UserProfileModalComponent>,
              private userRestService: UserRestService,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
    this.username = username;
    this.loadData();
  }

  loadData() {
    this.loadUserInfo();
    this.loadFollowingInfo();
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

  ngOnDestroy(){
    this.subs.forEach(s => s.unsubscribe());
  }
}
