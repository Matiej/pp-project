import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { PostModel } from './post-model';

@Component({
  selector: 'app-section18-http-req',
  templateUrl: './section18-http-req.component.html',
  styleUrls: ['./section18-http-req.component.css'],
})
export class Section18HttpReqComponent implements OnInit {
  readonly fireBasePostUrl: string =
    'https://ppproject-35b60-default-rtdb.firebaseio.com/posts.json';
  loadedPosts: PostModel[] = [];
  isFetchingPosts: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPostsFromFirebase();
  }

  onCreatePost(form: NgForm): void {
    const post: PostModel = form.value;
    console.log(post);
    this.http
      .post<{ name: string }>(this.fireBasePostUrl, post)
      .subscribe((response) => {
        console.log(response);
        this.fetchPostsFromFirebase();
      });
      form.resetForm();
      
  }

  onClearPosts() {}
  onFetchPosts() {
    this.fetchPostsFromFirebase();
  }

  private fetchPostsFromFirebase() {
    this.isFetchingPosts = true;
    this.http
      .get<{ [key: string]: PostModel }>(this.fireBasePostUrl)
      .pipe(
        map((response) => {
          const posts: PostModel[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              let post = new PostModel(
                response[key].title,
                response[key].content
              );
              post.id = key;
              posts.push(post);
            }
          }
          return posts;
        })
      )
      .subscribe((fetchedPosts: PostModel[]) => {
        this.loadedPosts = fetchedPosts;
        this.isFetchingPosts = false;
      });
  }
}
