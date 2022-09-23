import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Post } from '../../models/post.model';
import { UserFollowing } from '../../models/user-following.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  postsDailyLimit: number = 5;

  keyPosts = "posts-posterr-strider";
  keyFollowingUsers = "followingUsers-posterr-strider";

  getPosts(username?: string): Observable<Array<Post>> {
    let posts = this.getPostsFromStorage();

    if(username) {
      const followingUsers = this.getFollowingUsers(username);
      posts = posts.filter(post => followingUsers.some(fu => fu == post.author));
    }

    posts.sort((a, b) => new Date(a.datetime) < new Date(b.datetime) ? 1 : -1);
    return of(posts);
  }

  savePost(post: Post): Observable<any> {
    post.datetime = new Date();
    const posts = this.getPostsFromStorage();

    if(this.getCountDailyPostUser(posts, post.author) >= this.postsDailyLimit) {

      const errorWithTimestamp$ = throwError(() => {
        const error: any = new Error($localize`${"User reached 5 posts daily limit!"}`);
        error.timestamp = Date.now();
        return error;
      });

      return errorWithTimestamp$
    }

    posts.push(post);
    this.storePosts(posts);

    return of(true);
  }

  private getCountDailyPostUser(posts: Array<Post>, username: string): number {
    let today = new Date();
    today.setMilliseconds(0);
    today.setSeconds(0);
    today.setMinutes(0);
    today.setHours(0);

    return posts.filter(p => p.author == username && new Date(p.datetime) >= today).length;
  }

  private storePosts(posts: Array<Post>){
    localStorage.setItem(this.keyPosts, JSON.stringify(posts))
  }

  private getPostsFromStorage(): Array<Post> {
    const postsValue = localStorage.getItem(this.keyPosts);

    if(postsValue == null) {
      return [];
    } else {
      return JSON.parse(postsValue) as Array<Post>;
    }
  }

  private getFollowingUsers(username: string): Array<string> {
    const followingUsersValue = localStorage.getItem(this.keyFollowingUsers);

    if(followingUsersValue == null) {
      return [];
    }

    const followingUsers = JSON.parse(followingUsersValue) as Array<UserFollowing>;
    return followingUsers.filter(fu => fu.username == username).map(fu => fu.userFollowing);
  }
}
