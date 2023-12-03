import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import {UserModel} from "../../../auth/models/user.model";
import {AuthService} from "../../../auth/services";

@Component({
  selector: 'cons-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  comments: any[] = [];
  newComment: string = '';
  newRating: number = 0;
  userName: string = '';
  user: UserModel | undefined;

  constructor(private commentService: CommentService, private authService: AuthService ) {}

  ngOnInit(): void {
    this.loadComments();
    this.user = this.authService.currentUserValue;
  }

  loadComments(): void {
    this.commentService.getComments().subscribe((data) => {
      this.comments = data;
    });
  }

  addComment(): void {
    const newCommentObject = {
      text: this.newComment,
      rating: this.newRating,
      userName: this.user?.name
    };
    this.commentService.addComment(newCommentObject).subscribe(() => {
      this.loadComments();
      this.newComment = '';
      this.newRating = 0;
    });
  }
}
