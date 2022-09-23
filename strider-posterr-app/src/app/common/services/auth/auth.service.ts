import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subjectLoggedUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  loggedUser$: Observable<User> = this.subjectLoggedUser.asObservable();

  constructor(){
    this.subjectLoggedUser.next({
      username: "brunophmaia",
      joinedDate: new Date(2022, 8, 19)
    });
  }

  getLoggedUsername(): string {
    return this.subjectLoggedUser.value.username;
  }
}
