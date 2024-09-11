import {Component, OnInit} from '@angular/core';
import {ListRoomOrderService} from "../../web/index/page/list-room-order/list-room-order.service";

@Component({
  selector: 'cons-list-room-books',
  templateUrl: './list-room-books.component.html',
  styleUrls: ['./list-room-books.component.scss']
})
export class ListRoomBooksComponent implements OnInit{
  public tasks: any[] = [];
  private today: Date = new Date();

  constructor(private roomOrderService: ListRoomOrderService) {}

  ngOnInit(): void {
    this.listCustomers();
  }

  listCustomers(): void {
    this.roomOrderService.listCustomerUseRoom().subscribe((res: any) => {
      const sortedTasks = res.body.map((item: any, index: number) => {
        const startDate = new Date(item.checkIn);
        const endDate = new Date(item.checkOut);
        const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        return {
          uniqueId: `${item.idPhong}-${index}`, // Thêm uniqueId
          id: item.idPhong,
          roomCode: item.maPhong,
          startDate: startDate,
          endDate: endDate,
          duration: duration
        };
      }).sort((a: any, b: any) => a.startDate.getTime() - b.startDate.getTime());

      this.tasks = this.adjustTaskPositions(sortedTasks);
    });
  }

  adjustTaskPositions(tasks: any[]): any[] {
    let lastEndDate: Date | null = null;
    return tasks.map((task: any) => {
      if (lastEndDate) {
        // Cập nhật ngày bắt đầu của task tiếp theo
        task.startDate = new Date(Math.max(task.startDate.getTime(), lastEndDate.getTime() + 24 * 60 * 60 * 1000));
      }
      lastEndDate = new Date(task.endDate);
      return task;
    });
  }

  getTaskWidth(task: any): number {
    const totalDaysInMonth = this.getDaysInMonth(task.startDate);
    const duration = Math.ceil((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    if (totalDaysInMonth > 0) {
      return (duration / totalDaysInMonth) * 100;
    }
    return 0;
  }

  getDaysInMonth(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth(); // Tháng bắt đầu từ 0
    return new Date(year, month + 1, 0).getDate();
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  getTaskPosition(task: any): number {
    const startDate = task.startDate;
    const monthStart = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const daysFromMonthStart = Math.ceil((startDate.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24));
    const totalDaysInMonth = this.getDaysInMonth(startDate);

    if (totalDaysInMonth > 0) {
      return (daysFromMonthStart / totalDaysInMonth) * 100;
    }
    return 0;
  }

  getTaskBarColor(task: any): string {
    const now = new Date();
    if (now >= task.startDate && now <= task.endDate) {
      return 'yellow'; // Màu vàng nếu hiện tại nằm trong khoảng thời gian
    } else if (now > task.endDate) {
      return 'red'; // Màu đỏ nếu ngày hiện tại đã vượt qua ngày kết thúc
    } else {
      return 'green'; // Màu xanh lá nếu ngày hiện tại chưa đến ngày bắt đầu
    }
  }

}
