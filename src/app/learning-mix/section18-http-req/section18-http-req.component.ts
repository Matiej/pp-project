import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section18-http-req',
  templateUrl: './section18-http-req.component.html',
  styleUrls: ['./section18-http-req.component.css'],
})
export class Section18HttpReqComponent implements OnInit {
  readonly fireBasePostUrl: string =
    'https://ppproject-35b60-default-rtdb.firebaseio.com/posts.json';
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onCreatePost(post: { title: string; content: string }) {
    console.log(post);
    this.http.post(this.fireBasePostUrl, post).subscribe(response => {
      console.log(response);
    });
  }

  onClearPosts() {}
  onFetchPosts() {}
}
