import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Post } from '../../models/post.model';
import { UserFollowing } from '../../models/user-following.model';
import { UserInfo } from '../../models/user-info.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  postsDailyLimit: number = 5;

  keyPosts = "posts-posterr-strider";
  keyFollowingUsers = "followingUsers-posterr-strider";
  keyUsers = "users-posterr-strider";

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

  getFollowingStatus(loggedUser: string, accountUsername: string): Observable<boolean> {
    const followingUsers = this.getFollowingFromStorage();
    return of(followingUsers.some(fu => fu.username == loggedUser && fu.userFollowing == accountUsername));
  }

  follow(loggedUser: string, accountUsername: string): Observable<boolean> {
    let followingUsers = this.getFollowingFromStorage();
    followingUsers.push({
      username: loggedUser,
      userFollowing: accountUsername
    });
    this.storeUserFollowing(followingUsers);
    return of(true);
  }

  unfollow(loggedUser: string, accountUsername: string): Observable<boolean> {
    let followingUsers = this.getFollowingFromStorage();
    const index = followingUsers.findIndex(fu => fu.username == loggedUser && fu.userFollowing == accountUsername);
    followingUsers.splice(index, 1);
    this.storeUserFollowing(followingUsers);
    return of(true);
  }

  getUserInfo(username: string): Observable<UserInfo> {
    const postsUser = this.getPostsFromStorage().filter(p => p.author == username);
    const followingUsers = this.getFollowingFromStorage();
    const user = this.getUsersFromStorage().find(u => u.username == username) as User;

    return of({
      postCount: postsUser.length,
      followersCount: followingUsers.filter(fu => fu.userFollowing == username).length,
      followingCount: followingUsers.filter(fu => fu.username == username).length,
      username: username,
      joinedDate: new Date(user?.joinedDate)
    });
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

  private storeUserFollowing(usersFollowing: Array<UserFollowing>){
    localStorage.setItem(this.keyFollowingUsers, JSON.stringify(usersFollowing))
  }

  private getPostsFromStorage(): Array<Post> {
    const postsValue = localStorage.getItem(this.keyPosts);

    if(postsValue == null) {
      return [];
    } else {
      return JSON.parse(postsValue) as Array<Post>;
    }
  }

  private getFollowingFromStorage(): Array<UserFollowing>{
    const followingUsersValue = localStorage.getItem(this.keyFollowingUsers);

    if(followingUsersValue == null) {
      return [];
    } else {
      return JSON.parse(followingUsersValue) as Array<UserFollowing>;
    }
  }

  private getUsersFromStorage(): Array<User>{
    const usersValue = localStorage.getItem(this.keyUsers);

    if(usersValue == null) {
      return [];
    } else {
      return JSON.parse(usersValue) as Array<User>;
    }
  }

  private getFollowingUsers(username: string): Array<string> {
    const followingUsers = this.getFollowingFromStorage();
    return followingUsers.filter(fu => fu.username == username).map(fu => fu.userFollowing);
  }
}
