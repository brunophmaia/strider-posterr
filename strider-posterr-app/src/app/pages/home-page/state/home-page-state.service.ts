import { Injectable, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/common/models/post.model';
import { PostRestService } from 'src/app/common/rest-services/post-rest-service';
import { AuthService } from 'src/app/common/services/auth/auth.service';

export enum PostFilterType {
  ALL,
  FOLLOWING
}

@Injectable({
  providedIn: 'root'
})
export class HomePageStateService implements OnDestroy {

  private subjectPosts: BehaviorSubject<Array<Post>> = new BehaviorSubject<Array<Post>>([]);
  posts$: Observable<Array<Post>> = this.subjectPosts.asObservable();

  subs: Array<Subscription> = [];
  toggleAll: boolean = true;

  formPostType: FormControl = new FormControl();

  constructor(private postRestService: PostRestService,
              private authService: AuthService) { 
    this.initChangesPostType();
  }

  initChangesPostType(){
    this.subs.push(
      this.formPostType.valueChanges.subscribe((data: PostFilterType) => {
        if(data == PostFilterType.ALL) {
          this.loadPosts();
        } else {
          this.loadFollowingPosts(this.authService.getLoggedUsername());
        }
      })
    );
  }

  setPostTypeFromPath(postType: PostFilterType){
    this.formPostType.setValue(postType);
  }

  loadPosts(){
    this.subs.push(
      this.postRestService.getAll().subscribe(posts => {
        this.subjectPosts.next(posts);
      })
    )
  }

  loadFollowingPosts(username: string) {
    this.subs.push(
      this.postRestService.getAllFollowing(username).subscribe(posts => {
        this.subjectPosts.next(posts);
      })
    )
  }

  createPost(post: Post): Observable<any> {
    post.author = this.authService.getLoggedUsername();
    return this.postRestService.post(post);
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
