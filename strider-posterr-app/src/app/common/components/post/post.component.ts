import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostRestService } from '../../rest-services/post-rest-service';
import { DeviceService } from '../../services/device/device.service';
import { insertAtUsername, userProfilePath } from '../../util/common.util';
import { getPostDateString } from '../../util/date.util';
import { RepostComponent, RepostModel } from '../repost/repost.component';

@Component({
  selector: 'posterr-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post: Post
  @Input() showActions: boolean = true;
  @Input() enabledClickUser: boolean = true;
  @Input() repostAuthor: string;
  @Input() userProfile: boolean = false;

  @Output() eventReposted: EventEmitter<any> = new EventEmitter();
  
  subjectRepost: Subject<Post> = new Subject<Post>();
  repost$: Observable<Post> = this.subjectRepost.asObservable();

  author: string;
  date: string;
  subRepost: Subscription;
  isRepost: boolean;
  subs: Array<Subscription> = [];

  constructor(private router: Router,
              private deviceService: DeviceService,
              private dialog: MatDialog,
              private postRestService: PostRestService,
              private snackBar: MatSnackBar){}

  ngOnInit() {
    this.setAuthor();
    this.setDate();
    this.checkIsRepost();
  }

  checkIsRepost(){
    this.isRepost = !this.post.text;
  }

  openUser(){
    if(this.enabledClickUser) {
      this.router.navigate([`/${userProfilePath}/${this.post.author}`]).then(() => {
        if(this.userProfile) {
          window.location.reload();
        }
      });
    }
  }

  repost(){
    let post = new Post();
    post.author = this.repostAuthor;
    post.idRepost = this.post.id;
    this.saveRepost(post, "Reposted");
  }

  quotepost(){
    const subMobile = this.deviceService.isMobile$.subscribe(isMobile => {
      const dialog  = this.dialog.open(RepostComponent, {
        width: isMobile ? "95%" : "60%",
        panelClass: "profile-repost",
        data: {
          postId: this.post.id,
          subjectRepost: this.subjectRepost,
          author: this.repostAuthor
        } as RepostModel,
        autoFocus: false
      });

      this.initObservableRepost(dialog);
    });

    subMobile.unsubscribe();
  }

  initObservableRepost(dialog: MatDialogRef<RepostComponent>){

    if(this.subRepost) {
      this.subRepost.unsubscribe();
    }

    this.subRepost = this.repost$.subscribe(post => {
      this.saveRepost(post, "Quote reposted").then(() => {
        dialog.close();
      });
    });
    this.subs.push(this.subRepost);
  }

  saveRepost(post: Post, messageCreated: string): Promise<void> {
    return new Promise((resolve) => {
      this.subs.push(
        this.postRestService.post(post).subscribe({
          next: () => {
            this.snackBar.open($localize`${messageCreated}${" successfully!"}`, "X", {
              panelClass: "success-post",
              verticalPosition: "top",
              duration: 5000
            });
            this.eventReposted.emit();
            resolve();
          },
          error: (err => {
            this.snackBar.open(err, "X", {
              panelClass: "error-post",
              verticalPosition: "top"
            });
          })
        })
      );
    });
  }

  private setAuthor(){
    this.author = insertAtUsername(this.post.author);
  }

  private setDate(){
    this.date = getPostDateString(this.post.datetime);
  }

  ngOnDestroy(){
    this.subs.forEach(s => s.unsubscribe());
  }
}
