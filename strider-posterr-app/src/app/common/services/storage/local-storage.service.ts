import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Post } from '../../models/post.model';
import { UserFollowing } from '../../models/user-following.model';
import { UserInfo } from '../../models/user-info.model';
import { User } from '../../models/user.model';
import { copy } from '../../util/common.util';

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
    let filteredPosts: Array<Post> = [];

    if(username) {
      const followingUsers = this.getFollowingUsers(username);
      filteredPosts = posts.filter(post => followingUsers.some(fu => fu == post.author));
    } else {
      filteredPosts = posts;
    }

    this.fillReposts(filteredPosts, posts);

    filteredPosts.sort((a, b) => new Date(a.datetime) < new Date(b.datetime) ? 1 : -1);
    return of(filteredPosts);
  }

  getPostsByUser(username?: string): Observable<Array<Post>> {
    let posts = this.getPostsFromStorage();
    const filteredPosts = posts.filter(post => username == post.author);
    this.fillReposts(filteredPosts, posts);
    filteredPosts.sort((a, b) => new Date(a.datetime) < new Date(b.datetime) ? 1 : -1);
    return of(filteredPosts);
  }

  getPost(postId: string): Observable<Post> {
    const posts = this.getPostsFromStorage();
    const post = posts.find(p => p.id == postId) as Post;
    this.fillRepost(post, posts);
    return of(post);
  }

  savePost(post: Post): Observable<any> {
    post.datetime = new Date();
    post.id = `${post.datetime.getTime()}-${post.author}`;

    const posts = this.getPostsFromStorage();

    if(this.getCountDailyPostUser(posts, post.author) >= this.postsDailyLimit) {

      const errorWithTimestamp$ = throwError(() => {
        const error: any = new Error($localize`${"User reached "}${this.postsDailyLimit}${" posts daily limit!"}`);
        error.timestamp = Date.now();
        return error;
      });

      return errorWithTimestamp$
    }

    posts.push(post);
    this.storePosts(posts);

    this.checkUserOnInsertPost(post.author);

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
      joinedDate: user?.joinedDate ? new Date(user.joinedDate) : undefined
    });
  }

  insertDefaultUser(user: User) {
    const users = this.getUsersFromStorage();
    const userFound = users.find(u => u.username == user.username);

    if(userFound) {
      userFound.joinedDate = user.joinedDate
    } else {
      users.push(user);
    }

    this.storeUsers(users); 
  }

  private checkUserOnInsertPost(username: string){
    const users = this.getUsersFromStorage();
    const userExists = users.some(u => u.username == username);

    if(!userExists) {
      users.push({
        username,
        joinedDate: new Date()
      });

      this.storeUsers(users);
    }
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

  private storeUsers(users: Array<User>){
    localStorage.setItem(this.keyUsers, JSON.stringify(users))
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

  private fillReposts(filteredPost: Array<Post>, allPosts: Array<Post>){
    allPosts = copy(allPosts);
    filteredPost.forEach(post => {
      this.fillRepost(post, allPosts);
    });
  }

  private fillRepost(post: Post, allPosts: Array<Post>){
    allPosts = copy(allPosts);
    post.repost = allPosts.find(repost => repost.id == post.idRepost);
  }
}
