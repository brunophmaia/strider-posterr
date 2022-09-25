import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollContentService {

  private subjectScrollTop: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  scrollTop$: Observable<void> = this.subjectScrollTop.asObservable();

  public scrollTop(){
    this.subjectScrollTop.next();
  }
}
