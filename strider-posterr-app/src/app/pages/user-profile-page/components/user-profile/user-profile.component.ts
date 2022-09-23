import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from 'rxjs';
import { UserProfileModalComponent } from '../user-profile-modal/user-profile-modal.component';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/common/services/route/route.service';
import { allPath, followingPath } from 'src/app/common/util/common.util';

@Component({
  selector: 'posterr-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  subs: Array<Subscription> = [];

  constructor(private dialog: MatDialog,
              private router: Router,
              private routeService: RouteService) { }

  ngOnInit() {
    this.subs.push(
      this.dialog.open(UserProfileModalComponent).afterClosed()
        .subscribe(() => {
          this.navigateRouteAfterProfileClosed();
        })
    );
  }

  private navigateRouteAfterProfileClosed(){
    switch(this.routeService.previousRoute) {
      case `/${followingPath}`:
        this.router.navigate([followingPath]);
        break;
      default:
        this.router.navigate([allPath]);
        break;
    }
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
