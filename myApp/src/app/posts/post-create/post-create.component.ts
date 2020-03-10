import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  templateUrl: "./post-create.component.html",
  selector: 'app-post-create',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{
  // injects serviceProvider in the post-create
  constructor(public postsService: PostService){}

  onPostSubmit(form: NgForm){
    if(form.invalid){
      return;
    }
    this.postsService.addPost(
      form.value.firstName,
      form.value.lastName,
      form.value.address,
      form.value.city,
      form.value.state,
      form.value.postCode
    );


  }
}
