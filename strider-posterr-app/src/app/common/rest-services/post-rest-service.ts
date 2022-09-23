import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post.model';
import { LocalStorageService } from '../services/storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PostRestService {

  constructor(private storageService: LocalStorageService) {}

  getAll(): Observable<Array<Post>>{
    return of(this.storageService.getPosts());
  }

  getAllFollowing(username: string) {
    return of(this.storageService.getPosts(username));
  }

  post(post: Post): Observable<any> {
    return of(this.storageService.savePost(post));
  }
}
