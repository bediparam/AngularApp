import { Component , OnInit, OnDestroy } from '@angular/core';
import { Post } from '../posts/post.model';
import {Subscription } from 'rxjs';
import { PostService } from '../posts/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  private postSub : Subscription;

  constructor(public postService: PostService){}

  //Its a func angular will execute when PostListComponent is created(basically a constructor)
  ngOnInit(){
    this.postService.getPosts();
    this.postService.getPostUpdateListener().subscribe( (posts: Post[])=>{
        this.posts = posts;
    } );
  }

  onDelete(postId: string){
    this.postService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
