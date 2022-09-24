import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/user-info.model';
import { LocalStorageService } from '../services/storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  constructor(private storageService: LocalStorageService) { }

  get(username: string): Observable<UserInfo> {
    return this.storageService.getUserInfo(username);
  }

  getFollowingStatus(loggedUser: string, accountUsername: string): Observable<boolean> {
    return this.storageService.getFollowingStatus(loggedUser, accountUsername);
  }

  follow(loggedUser: string, accountUsername: string): Observable<boolean> {
    return this.storageService.follow(loggedUser, accountUsername);
  }

  unfollow(loggedUser: string, accountUsername: string): Observable<boolean> {
    return this.storageService.unfollow(loggedUser, accountUsername);
  }
}
