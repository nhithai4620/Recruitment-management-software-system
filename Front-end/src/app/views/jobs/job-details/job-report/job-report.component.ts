import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-report',
  templateUrl: './job-report.component.html',
  styleUrls: ['./job-report.component.scss'],
})
export class JobReportComponent implements OnInit {
  @Input() details: any;
  chartDoughnutData = {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'Angular'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [40, 20, 80, 10],
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
