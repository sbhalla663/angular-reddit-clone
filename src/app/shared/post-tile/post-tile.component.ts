import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {
 @Input() posts: PostModel[];
  faComments=faComments;
  isLoggedIn: boolean = false;


  constructor(private router: Router,private authService: AuthService) {
    
   }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }
  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
  goToDeletePost(id: number):void{
    this.router.navigateByUrl('/delete-post/' + id);
  }

}
