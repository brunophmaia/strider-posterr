import { Injectable, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/common/models/post.model';
import { PostRestService } from 'src/app/common/rest-services/post-rest-service';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { SearchService } from 'src/app/common/services/search/search.service';

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
  search: string;

  formPostType: FormControl = new FormControl();

  constructor(private postRestService: PostRestService,
              private searchService: SearchService,
              private authService: AuthService) { 
    this.initChangesPostType();
    this.initChangeSearch();
  }

  setPostTypeFromPath(postType: PostFilterType, fromUserProfile: boolean = false){
    if(!fromUserProfile || !this.formPostType.value) {
      this.formPostType.setValue(postType);
    }
  }

  initChangesPostType(){
    this.subs.push(
      this.formPostType.valueChanges.subscribe((data: PostFilterType) => {
        this.loadPosts(data);
      })
    );
  }

  loadPosts(data: PostFilterType){
    if(data == PostFilterType.ALL) {
      this.loadAllPosts();
    } else {
      this.loadFollowingPosts(this.authService.getLoggedUsername());
    }
  }

  reloadPosts() {
    this.loadPosts(this.formPostType.value);
  }

  loadAllPosts(){
    this.subs.push(
      this.postRestService.getAll(this.search).subscribe(posts => {
        this.subjectPosts.next(posts);
      })
    )
  }

  loadFollowingPosts(username: string) {
    this.subs.push(
      this.postRestService.getAllFollowing(username, this.search).subscribe(posts => {
        this.subjectPosts.next(posts);
      })
    )
  }

  createPost(post: Post): Observable<any> {
    post.author = this.authService.getLoggedUsername();
    return this.postRestService.post(post).pipe(map(p => {
      this.loadPosts(this.formPostType.value);
      return p;
    }));
  }

  initChangeSearch(){
    this.subs.push(
      this.searchService.cleanSearch$.subscribe(() => {
        this.search = "";
        this.reloadPosts();
      })
    );


    this.subs.push(
      this.searchService.search$.subscribe(search => {
        this.search = search;
        this.reloadPosts();
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
