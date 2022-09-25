import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../models/post.model';

@Component({
  selector: 'posterr-post-maker',
  templateUrl: './post-maker.component.html',
  styleUrls: ['./post-maker.component.scss']
})
export class PostMakerComponent implements OnInit, OnDestroy {

  @Input() eventCleanPost: Observable<void>;
  @Input() isRepost: boolean = false;
  @Input() set enableMinimize (value: any) {
    this._enableMinimize = value;
    if(value) {
      this.minimize();
    }
  }

  @Output() createPostEvent: EventEmitter<Post> = new EventEmitter();

  _enableMinimize: boolean;
  form: FormControl = new FormControl("");
  maxLength = 777;
  rows: number = 5;
  subs: Array<Subscription> = [];

  ngOnInit(){
    this.initObservableCleanPost();
    this.initFormChanges();
  }
  
  initFormChanges(){
    this.subs.push(this.form.valueChanges.subscribe((data: string) => {
        if(this._enableMinimize) {
          if(data.length) {
            this.maximize();
          } else {
            this.minimize();
          }
        }
      })
    );
  }

  minimize(){
    this.rows = 1;
  }

  maximize(){
    this.rows = 5;
  }

  initObservableCleanPost(){
    if(this.eventCleanPost) {
      this.subs.push(this.eventCleanPost.subscribe(() => this.form.setValue("")));
    }
  }

  createPost(){
    let post = new Post();
    post.text = this.form.value;
    this.createPostEvent.emit(post);
  }

  ngOnDestroy(){
    this.subs.forEach(s => s.unsubscribe());
  }
}
