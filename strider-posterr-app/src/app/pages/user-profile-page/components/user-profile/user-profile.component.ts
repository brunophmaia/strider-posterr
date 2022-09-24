import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from 'rxjs';
import { UserProfileModalComponent } from '../user-profile-modal/user-profile-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from 'src/app/common/services/route/route.service';
import { allPath, followingPath, usernameParam } from 'src/app/common/util/common.util';
import { DeviceService } from 'src/app/common/services/device/device.service';

@Component({
  selector: 'posterr-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  subs: Array<Subscription> = [];

  constructor(private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private deviceService: DeviceService,
              private routeService: RouteService) { }

  ngOnInit() {
    const subMobile = this.deviceService.isMobile$.subscribe(isMobile => {
        this.subs.push(
          this.dialog.open(UserProfileModalComponent, {
            data: this.route.snapshot.paramMap.get(usernameParam),
            width: isMobile ? "95%" : "80%",
            panelClass: "user-profile-dialog",
            height: "90%",
            autoFocus: false
          }).afterClosed()
            .subscribe(() => {
              this.navigateRouteAfterProfileClosed();
          })
        );
    });
    subMobile.unsubscribe();
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
