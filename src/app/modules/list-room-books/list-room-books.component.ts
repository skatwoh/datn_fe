import {Component, OnInit} from '@angular/core';
import {ListRoomOrderService} from "../../web/index/page/list-room-order/list-room-order.service";

@Component({
  selector: 'cons-list-room-books',
  templateUrl: './list-room-books.component.html',
  styleUrls: ['./list-room-books.component.scss']
})
export class ListRoomBooksComponent implements OnInit{
  public tasks: any[] = [];

  constructor(private roomOrderService: ListRoomOrderService) {
  }

  ngOnInit(): void {
    this.listCustomers();
  }

  listCustomers(): void {
    this.roomOrderService.listCustomerUseRoom().subscribe((res: any) => {
      this.tasks = res.body.map((item: any) => {
        const startDate = new Date(item.checkIn);
        const endDate = new Date(item.checkOut);
        const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        return {
          id: item.idPhong,
          maPhong: item.maPhong,
          startDate: startDate,
          endDate: endDate,
          duration: duration
        };
      });
    });
  }

  getTaskWidth(task: any): number {
    const totalDays = 30; // Ví dụ số ngày của tháng
    const duration = task.duration;
    if (totalDays > 0) {
      return (duration / totalDays) * 100;
    }
    return 0;
  }

  getTaskDuration(task: any): number {
    return task.duration;
  }

}
