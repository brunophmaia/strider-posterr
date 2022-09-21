import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from 'rxjs';
import { UserProfileModalComponent } from '../user-profile-modal/user-profile-modal.component';

@Component({
  selector: 'posterr-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  subs: Array<Subscription> = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.subs.push(
      this.dialog.open(UserProfileModalComponent).afterClosed()
        .subscribe(() => {
            //implements back to route
        })
    );
  }

  ngOnDestroy(): void {
      this.subs.forEach(s => s.unsubscribe());
  }

}
