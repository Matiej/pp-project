import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
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
  postToastMessage: string = '';
  showToast: boolean = false;
  toastMessageClass: string = 'success-toast';

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
        form.resetForm();
      },
      (error: HttpErrorResponse) => {
        console.error('Error while saving posts: ' + post.id, error.message);
        this.isFetchingPosts = false;
        this.showToastMessage(
          TOAST_MESSAGES.SAVING_POST_ERROR + ' --- ' + error.error.error,
          4000,
          TOAST_MESSAGES.DANGER_MESSAGE_STYLE
        );
      }
      );
  }

  onClearPosts() {
    this.isFetchingPosts = true;
    this.http.delete(this.fireBasePostUrl).subscribe(() => {
      this.isFetchingPosts = false;
      this.fetchPostsFromFirebase();
    },
    (error: HttpErrorResponse) => {
      console.error('Error while deleting posts: ', error.message);
      this.isFetchingPosts = false;
      this.showToastMessage(
        TOAST_MESSAGES.DELETING_POSTS_ERROR + ' --- ' + error.error.error,
        4000,
        TOAST_MESSAGES.DANGER_MESSAGE_STYLE
      );
    }
    
    );
  }

  onFetchPosts() {
    this.fetchPostsFromFirebase();
  }

  onDeleteSinglePost(post: PostModel) {
    this.isFetchingPosts = true;
    let params = new HttpParams().append('name', post.id!);
    this.http.delete(this.fireBasePostUrl, { params: params }).subscribe(() => {
      this.fetchPostsFromFirebase();
      this.isFetchingPosts = false;
    },
    (error: HttpErrorResponse) => {
      console.error('Error while deleting post: ' + post.id, error.message);
      this.isFetchingPosts = false;
      this.showToastMessage(
        TOAST_MESSAGES.DELETING_POSTS_ERROR + ' --- ' + error.error.error,
        4000,
        TOAST_MESSAGES.DANGER_MESSAGE_STYLE
      );
    }
    
    );
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
      .subscribe(
        (fetchedPosts: PostModel[]) => {
          this.loadedPosts = fetchedPosts;
          this.isFetchingPosts = false;
        },
        (error: HttpErrorResponse) => {
          console.error('Error while fetching posts: ', error.message);
          this.isFetchingPosts = false;
          this.showToastMessage(
            TOAST_MESSAGES.FETCHING_POSTS_ERROR + ' --- ' + error.error.error,
            4000,
            TOAST_MESSAGES.DANGER_MESSAGE_STYLE
          );
        }
      );
  }

  private showToastMessage(
    message: string,
    timeout: number,
    messageStyle: string
  ): void {
    this.postToastMessage = message;
    this.showToast = true;
    this.toastMessageClass = messageStyle;
    setTimeout(() => {
      this.showToast = false;
      this.postToastMessage = '';
      this.toastMessageClass = '';
    }, timeout);
  }
}
