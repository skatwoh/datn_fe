import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import * as ApexCharts from 'apexcharts';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {RoomManagerService} from "../../../modules/room-manager/services/room-manager.service";
import {MonthlyBooking} from "../../../models/monthly-bookings";

@Component({
  selector: 'cons-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  standalone: true,
  imports: [CommonModule],
})

export class ChartComponent implements OnInit{
  constructor(private bookingService: RoomManagerService) {}

  ngOnInit(): void {
    this.bookingService.getMonthlyBookings().subscribe((data: MonthlyBooking[]) => {
      const categories = data.map((item) => `${item.month}/${item.year}`);
      const seriesData = data.map((item) => item.total);
      this.renderChart(categories, seriesData);
      console.log(categories, "categories")
      console.log(seriesData, "seriesData")
    });
  }

  renderChart(categories: string[], seriesData: number[]): void {
    const chartConfig = {
      series: [
        {
          name: 'Bookings',
          data: seriesData,
        },
      ],
      chart: {
        type: 'line',
        height: 240,
        toolbar: {
          show: false,
        },
      },
      title: {
        show: '',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#ff1871'],
      stroke: {
        lineCap: 'round',
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
        categories: categories,
      },
      yaxis: {
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: '#dddddd',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: 'light',
      },
    };

    const chart = new ApexCharts(
      document.querySelector('#line-chart-container'),
      chartConfig
    );
    chart.render();
  }
}
