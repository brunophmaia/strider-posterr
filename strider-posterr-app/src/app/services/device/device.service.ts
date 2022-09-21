import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private subjectIsMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private resize$: Observable<any>;

  isMobile$: Observable<boolean> = this.subjectIsMobile.asObservable();
  
  constructor() {
    this.resize$ = fromEvent(window, 'resize');
    this.resize$.subscribe(() => {
      this.setIsMobile();
    });

    this.setIsMobile();
  }

  private setIsMobile() {
    const previousValueIsMobile = this.subjectIsMobile.value;
    const isMobile = this.getIsMobile();
    
    if(isMobile != previousValueIsMobile){
      this.subjectIsMobile.next(isMobile);
    }
  }

  private getIsMobile(): boolean {
    const regexMobile = /MOBILE|ANDROID|IOS|IPAD/;
    return regexMobile.test(navigator.userAgent.toUpperCase());
  }
}
