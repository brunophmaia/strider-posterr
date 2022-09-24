import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostRestService } from '../../rest-services/post-rest-service';

export class RepostModel {
  postId: string;
  author: string;
  subjectRepost: Subject<Post>
}

@Component({
  selector: 'app-repost',
  templateUrl: './repost.component.html',
  styleUrls: ['./repost.component.scss']
})
export class RepostComponent implements OnDestroy {

  post: Post;
  dataRepost: RepostModel;
  subs: Array<Subscription> = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: RepostModel,
              public dialogRef: MatDialogRef<RepostComponent>,
              private postRestService: PostRestService) {
    
    this.dataRepost = data;
    this.loadPost();
  }

  loadPost(){
    this.subs.push(
      this.postRestService.get(this.dataRepost.postId).subscribe(post => {
        this.post = post;
      })
    );
  }

  createPost(post: Post){
    post.idRepost = this.post.id;
    post.author = this.dataRepost.author;
    this.dataRepost.subjectRepost.next(post);
  }

  close(){
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
