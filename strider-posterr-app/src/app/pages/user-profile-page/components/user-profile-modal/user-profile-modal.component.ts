import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/common/models/user-info.model';
import { UserRestService } from 'src/app/common/rest-services/user-rest.service';
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
  subs: Array<Subscription> = [];

  constructor(@Inject(MAT_DIALOG_DATA) username: string,
              public deviceService: DeviceService,
              public dialogRef: MatDialogRef<UserProfileModalComponent>,
              private userRestService: UserRestService) {
    this.loadData(username);
  }

  loadData(username: string) {
    this.loadUserInfo(username);
  }

  loadUserInfo(username: string){
    this.subs.push(
      this.userRestService.get(username).subscribe(userInfo => {
        this.userInfo = userInfo;
        this.username = userInfo.username;
        this.formattedUsername = insertAtUsername(userInfo.username);
        this.joinedDate = getFullDate(userInfo.joinedDate, true);
      })
    );
  }

  ngOnDestroy(){
    this.subs.forEach(s => s.unsubscribe());
  }
}
