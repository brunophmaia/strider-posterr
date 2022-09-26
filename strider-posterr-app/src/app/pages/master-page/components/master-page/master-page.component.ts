import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { DeviceService } from 'src/app/common/services/device/device.service';
import { MockUpDataService } from 'src/app/common/services/mock/mock-up-data.service';
import { SearchService } from 'src/app/common/services/search/search.service';
import { insertAtUsername } from 'src/app/common/util/common.util';
import { ScrollContentService } from '../../services/scroll-content.service';

@Component({
  selector: 'posterr-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent implements OnInit, OnDestroy {

  @ViewChild('scrollContent', { read: ElementRef }) public scrollContent: ElementRef<any>;

  constructor(private authService: AuthService,
              private scrollContentService: ScrollContentService,
              private searchService: SearchService,
              private mockUpDataService: MockUpDataService,
              public deviceService: DeviceService) { }

  username: string;
  menuOpened: boolean = false;
  subs: Array<Subscription> = [];

  ngOnInit(){
    this.initLoggedUser();
    this.initScrollTop();
  }

  initScrollTop(){
    this.subs.push(
      this.scrollContentService.scrollTop$.subscribe(() => {
        if(this.scrollContent?.nativeElement) {
          this.scrollContent.nativeElement.scrollTop = 0;
        }
      })
    );
  }

  initLoggedUser(){
    this.subs.push(
      this.authService.loggedUser$.subscribe(loggedUser => {
        this.username = insertAtUsername(loggedUser.username);
      })
    );
  }

  cleanAndMockData(){
    this.mockUpDataService.cleanAndMockData();
    this.navigateHome();
  }

  cleanData(){
    this.mockUpDataService.cleanData();
    this.navigateHome();
  }

  search(){
    this.searchService.open();
  }

  navigateHome(){
    window.location.reload();
  }

  ngOnDestroy(){
    this.subs.forEach(s => s.unsubscribe());
  }
}
