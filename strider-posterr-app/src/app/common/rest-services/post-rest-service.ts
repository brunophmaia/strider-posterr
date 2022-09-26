import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { LocalStorageService } from '../services/storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PostRestService {

  constructor(private storageService: LocalStorageService) {}

  getAll(search: string): Observable<Array<Post>>{
    return this.storageService.getPosts(undefined ,search);
  }

  getAllFollowing(username: string, search: string): Observable<Array<Post>> {
    return this.storageService.getPosts(username, search);
  }

  get(postId: string): Observable<any> {
    return this.storageService.getPost(postId);
  }

  post(post: Post): Observable<any> {
    return this.storageService.savePost(post);
  }

  getByUser(username: string): Observable<any> {
    return this.storageService.getPostsByUser(username);
  }
}
