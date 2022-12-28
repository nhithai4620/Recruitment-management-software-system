import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-job-report",
  templateUrl: "./job-report.component.html",
  styleUrls: ["./job-report.component.scss"],
})
export class JobReportComponent implements OnInit {
  @Input() details: any;
  chartDoughnutData = {
    labels: ["HR", "Developer", "Project manager", "Remote"],
    datasets: [
      {
        backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
        data: [3, 17, 10, 12],
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
