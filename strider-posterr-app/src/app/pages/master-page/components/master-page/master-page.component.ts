import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { DeviceService } from 'src/app/common/services/device/device.service';
import { insertAtUsername } from 'src/app/common/util/common.util';

@Component({
  selector: 'posterr-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              public deviceService: DeviceService) { }

  username: string;
  menuOpened: boolean = false;
  subs: Array<Subscription> = [];

  ngOnInit(){
    this.initLoggedUser();
  }

  initLoggedUser(){
    this.subs.push(
      this.authService.loggedUser$.subscribe(loggedUser => {
        this.username = insertAtUsername(loggedUser.username);
      })
    );
  }

  ngOnDestroy(){
    this.subs.forEach(s => s.unsubscribe());
  }
}
