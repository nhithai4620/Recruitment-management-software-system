import { Component, Input, OnInit } from "@angular/core";
import { RecruitersService } from "../../../core/services/recruiters.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddRecruiterComponent } from "src/app/views/recruiters/add-recruiter/add-recruiter.component";
// import { AddRecruiterComponent } from 'src/app/views/pages/recruiters/add-recruiter/add-recruiter.component';
// import { AddActivityComponent } from '../add-activity/add-activity.component';
import { AddActivitiesComponent } from "../../../views/activities/add-activities/add-activities.component";
import { AddJobComponent } from "../../../views/jobs/add-job/add-job.component";
import { AddCandidateComponent } from "src/app/views/candidates/add-candidate/add-candidate.component";

@Component({
  selector: "app-empty-data",
  templateUrl: "./empty-data.component.html",
  styleUrls: ["./empty-data.component.scss"],
})
export class EmptyDataComponent implements OnInit {
  @Input() action = "";
  constructor(
    private recruitersService: RecruitersService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  openAdd() {
    if (this.action == "recruiter") {
      const modalRef = this.modalService.open(AddRecruiterComponent, {
        centered: true,
        size: "lg",
      });
    } else if (this.action == "activity") {
      const modalRef = this.modalService.open(AddActivitiesComponent, {
        centered: true,
        size: "lg",
      });
    } else if (this.action == "jobs") {
      const modalRef = this.modalService.open(AddJobComponent, {
        centered: true,
        size: "lg",
      });
    } else if (this.action == "candidates") {
      const modalRef = this.modalService.open(AddCandidateComponent, {
        centered: true,
        size: "lg",
      });
    }
  }
}
