import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { insertAtUsername } from '../../util/common.util';
import { getPostDateString } from '../../util/date.util';

@Component({
  selector: 'posterr-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post
  @Input() isRepost: boolean = false;

  author: string;
  date: string;

  ngOnInit() {
    this.setAuthor();
    this.setDate();
  }

  private setAuthor(){
    this.author = insertAtUsername(this.post.author);
  }

  private setDate(){
    this.date = getPostDateString(this.post.datetime);
  }
}
