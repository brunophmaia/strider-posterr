import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { LocalStorageService } from '../services/storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PostRestService {

  constructor(private storageService: LocalStorageService) {}

  getAll(): Observable<Array<Post>>{
    return this.storageService.getPosts();
  }

  getAllFollowing(username: string): Observable<Array<Post>> {
    return this.storageService.getPosts(username);
  }

  post(post: Post): Observable<any> {
    return this.storageService.savePost(post);
  }

  getByUser(username: string): Observable<any> {
    return this.storageService.getPostsByUser(username);
  }
}
