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
    const postsValue = localStorage.getItem(this.keyPosts);

    if(postsValue == null) {
      return [];
    }

    const posts = JSON.parse(postsValue) as Array<Post>;

    if(username == null) {
      return posts;
    } else {
      const followingUsers = this.getFollowingUsers(username);
      return posts.filter(post => followingUsers.some(fu => fu == post.author));
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
