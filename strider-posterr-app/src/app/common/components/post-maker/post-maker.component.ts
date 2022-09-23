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

  @Output() createPostEvent: EventEmitter<Post> = new EventEmitter();

  form: FormControl = new FormControl("", Validators.required);
  maxLength = 777;
  subs: Array<Subscription> = [];

  ngOnInit(){
    this.initObservableCleanPost();
  }

  initObservableCleanPost(){
    this.subs.push(this.eventCleanPost.subscribe(() => this.form.setValue("")));
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
