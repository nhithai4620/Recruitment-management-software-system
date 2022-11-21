import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-report',
  templateUrl: './candidate-report.component.html',
  styleUrls: ['./candidate-report.component.scss'],
})
export class CandidateReportComponent implements OnInit {
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
