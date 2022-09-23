import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { insertAtUsername, userProfilePath } from '../../util/common.util';
import { getPostDateString } from '../../util/date.util';

@Component({
  selector: 'posterr-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post
  @Input() isRepost: boolean = false;
  @Input() enabledClickUser: boolean = true;

  author: string;
  date: string;

  constructor(private router: Router){}

  ngOnInit() {
    this.setAuthor();
    this.setDate();
  }

  openUser(){
    if(this.enabledClickUser) {
      this.router.navigate([`${userProfilePath}/${this.post.author}`]);
    }
  }

  private setAuthor(){
    this.author = insertAtUsername(this.post.author);
  }

  private setDate(){
    this.date = getPostDateString(this.post.datetime);
  }
}
