import { Injectable } from '@angular/core';
import { Post } from '../../models/post.model';
import { UserFollowing } from '../../models/user-following.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  keyPosts = "posts-posterr-strider";
  keyFollowingUsers = "followingUsers-posterr-strider";

  getPosts(username?: string): Array<Post> {
    let posts = this.getPostsFromStorage();

    if(username) {
      const followingUsers = this.getFollowingUsers(username);
      posts = posts.filter(post => followingUsers.some(fu => fu == post.author));
    }

    posts.sort((a, b) => new Date(a.datetime) < new Date(b.datetime) ? 1 : -1);
    return posts;
  }

  savePost(post: Post) {
    post.datetime = new Date();
    const posts = this.getPostsFromStorage();
    posts.push(post);
    this.storePosts(posts);
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
