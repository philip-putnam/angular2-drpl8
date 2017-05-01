import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts = [];

  constructor(private blogService: BlogService) { }

  ngOnInit() {

    this.blogService.getPosts().subscribe(res => {

      this.posts = res;

      console.log("Data received: ", res);
    }, err => {

      console.log(err);
    })
  }

}
