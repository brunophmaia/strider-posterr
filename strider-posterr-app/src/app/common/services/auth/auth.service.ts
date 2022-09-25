import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subjectLoggedUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  loggedUser$: Observable<User> = this.subjectLoggedUser.asObservable();

  constructor(private storageService: LocalStorageService){
    
    const user: User = {
      username: "brunophmaia",
      joinedDate: new Date(2022, 8, 19)
    }

    this.subjectLoggedUser.next(user);
    this.storageService.insertDefaultUser(user);
  }

  getLoggedUsername(): string {
    return this.subjectLoggedUser.value.username;
  }
}
