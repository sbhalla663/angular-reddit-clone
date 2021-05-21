import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { throwError } from 'rxjs';
import { CreatePostPayload } from './create-post.payload';
import { PostModel } from 'src/app/shared/post-model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postId: number;
  post: PostModel;
 
  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  subreddits: Array<SubredditModel>;
  tinymceInit: any;
  

  constructor(private router: Router, private postService: PostService,
    private subredditService: SubredditService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: ''
    }
  }

  ngOnInit() {
    

    this.tinymceInit = {
      height: 500,
      plugins : [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern"
      ],
      toolbar : 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
      image_advtab : true,
      file_picker_callback : function(cb, value, meta) {
        var input = document.createElement('input') as HTMLInputElement;
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
    
        // Note: In modern browsers input[type="file"] is functional without 
        // even adding it to the DOM, but that might not be the case in some older
        // or quirky browsers like IE, so you might want to add it to the DOM
        // just in case, and visually hide it. And do not forget do remove it
        // once you do not need it anymore.
    
        input.onchange = function() {
          var file=input.files[0];
          
          var reader = new FileReader();
          reader.onload = function () {
            // Note: Now we need to register the blob in TinyMCEs image blob
            // registry. In the next release this part hopefully won't be
            // necessary, as we are looking to handle it internally.
           
            var base64 = (reader.result as string).split(',')[1];
    
            // call the callback and populate the Title field with the file name
            cb('data:image/png;base64,'+base64, { title: file.name });
          };
          reader.readAsDataURL(file);
        };
    
        input.click();
      }
    }
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName').value;
    this.postPayload.url = this.createPostForm.get('url').value;
    this.postPayload.description = this.createPostForm.get('description').value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }


  discardPost() {
    this.router.navigateByUrl('/');
  }
  


  
}

        

