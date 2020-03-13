import {Post} from './post.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'


@Injectable({providedIn: "root"})
export class PostService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts(){
    this.http
      .get<{message: string, posts: any}>(
        'http://localhost:3000/api/posts'
      )
      .pipe(map((postData)=>{
        return postData.posts.map(post => {
          return{
            id: post._id,
            firstName: post.firstName,
            lastName: post.lastName,
            address: post.address,
            city: post.city,
            state: post.state,
            postCode: post.postCode,

          };
        });
      }))
      .subscribe((transformedPosts) =>{
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }
  addPost(firstname: string, lastname: string, address: string, city: string, state: string, postCode: number){
    const post: Post = {
      id: null,
      firstName:firstname,
      lastName: lastname,
      address: address,
      city: city,
      state: state,
      postCode: postCode
    };

    this.http.post<{message:string, postId : string}>('http://localhost:3000/api/posts',post).subscribe((responseData)=>{
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });

  }

  deletePost(postId: string){
    this.http.delete("http://localhost:3000/api/posts/"+ postId)
    .subscribe(() =>{
      var updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }
}
