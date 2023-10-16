import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../services/room.service";
import {RoomModel} from "../../../models/room.model";

@Component({
  selector: 'cons-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent {
  @Input() viewModel = false;

  @Input() currentRoom: RoomModel = {
    id: 0,
    ma: '',
    giaPhong: 0,
    trangThai: 0,
    idLoaiPhong: ''
  };

  message = '';

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewModel) {
      this.message = '';
      this.getRoom(this.route.snapshot.params['id']);
    }
  }

  getRoom(id: number): void {
    this.roomService.get(id).subscribe({
      next: (data) => {
        this.currentRoom = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  // updatePublished(status: boolean): void {
  //   const data = {
  //     ma: this.currentRoom.ma,
  //     giaPhong: this.currentRoom.giaPhong,
  //     trangThai: 1,
  //     idLoaiPhong: '1'
  //   };
  //
  //   this.message = '';
  //
  //   this.roomService.update(this.currentRoom.id, data).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.currentRoom.published = status;
  //       this.message = res.message
  //         ? res.message
  //         : 'The status was updated successfully!';
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }

  updateRoom(): void {
    this.message = '';

    this.roomService
      .update(this.currentRoom.id, this.currentRoom)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This room was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  // deleteTutorial(): void {
  //   this.roomService.delete(this.currentRoom.id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.router.navigate(['/tutorials']);
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }
}
