import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {
  postId: number;
  post: PostModel;
  comments: CommentPayload[];

  constructor(private postService: PostService,private router: Router,private activateRoute: ActivatedRoute,private commentService: CommentService) { 
    this.postId = this.activateRoute.snapshot.params.id;

  }

  ngOnInit(): void {
    this.deletePostById();
  }


   deletePostById() {
    this.postService.deletePost(this.postId).subscribe(data => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    });
  }
  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }
  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }
  goBackToHomePage() {
    this.router.navigateByUrl('/');
  }

}
