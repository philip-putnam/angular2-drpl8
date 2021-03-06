import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts = [];

  constructor(private blogService: BlogService) { }

  ngOnInit() {

    console.log(this.blogService.getPosts());

    this.blogService.getPosts().subscribe(res => {

      this.posts = res;

      console.log("Data received: ", res);
    }, err => {

      console.log(err);
    })
  }

  show_alert() {
    console.log("hello");
  }

}
