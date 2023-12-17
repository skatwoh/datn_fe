import {Component, OnInit} from '@angular/core';
import {CommentService} from './comment.service';
import {UserModel} from "../../../auth/models/user.model";
import {AuthService} from "../../../auth/services";
import {ActivatedRoute} from "@angular/router";
import {CommentModel} from "../../../models/comment.model";

@Component({
  selector: 'cons-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  comments: CommentModel[] = [];
  newComment: string = '';
  newRating: number = 0;
  user: UserModel | undefined;
  id: string | null | undefined;

  constructor(private commentService: CommentService, private authService: AuthService, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadComments();
    this.user = this.authService.currentUserValue;
  }

  loadComments(): void {
    this.commentService.getComments(1, 50, this.id).subscribe((data) => {
      this.comments = data.content;
    });
  }

  addComment(): void {
    const newCommentObject = {
      moTa: this.newComment,
      trangThai: this.newRating,
      idKhachHang: this.user?.id,
      idChiTietPhong: this.id,
    };
    this.commentService.addComment(newCommentObject).subscribe(() => {
      this.loadComments();
      this.newComment = '';
      this.newRating = 0;
    });
  }
}
