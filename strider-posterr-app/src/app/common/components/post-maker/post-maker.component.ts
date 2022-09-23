import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Post } from '../../models/post.model';

@Component({
  selector: 'posterr-post-maker',
  templateUrl: './post-maker.component.html',
  styleUrls: ['./post-maker.component.scss']
})
export class PostMakerComponent {

  @Output() createPostEvent: EventEmitter<Post> = new EventEmitter();

  form: FormControl = new FormControl("", Validators.required);
  maxLength = 777;

  createPost(){
    let post = new Post();
    post.text = this.form.value;
    this.createPostEvent.emit(post);
  }

}
