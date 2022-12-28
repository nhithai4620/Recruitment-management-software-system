import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-candidate-report",
  templateUrl: "./candidate-report.component.html",
  styleUrls: ["./candidate-report.component.scss"],
})
export class CandidateReportComponent implements OnInit {
  @Input() details: any;
  chartDoughnutData = {
    labels: ["Front-end", "Back-end", "Tester", "Machine Learning"],
    datasets: [
      {
        backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
        data: [10, 20, 30, 10],
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}
}
