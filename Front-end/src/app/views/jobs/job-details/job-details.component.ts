import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { JobRequisitionService } from "../../../core/services/job-requisition.service";
import { AssignJobsComponent } from "src/app/shared/components/assign-jobs/assign-jobs.component";
import { DeleteConfirmDialogComponent } from "src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component";

@Component({
  selector: "app-job-details",
  templateUrl: "./job-details.component.html",
  styleUrls: ["./job-details.component.scss"],
})
export class JobDetailsComponent implements OnInit {
  jobDetail!: any;

  candidateList: any[] = [];

  detailsForm: FormGroup = new FormGroup({});

  tabIndex = 0;

  id!: any;

  todo: any[] = [];

  done: any[] = [];

  review: any = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private jobsService: JobRequisitionService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.id = this.route.snapshot.paramMap.get("id");
    this.jobsService.getCandidates(this.id);
    this.jobsService.candidates$.subscribe((data) => {
      this.candidateList = data;

      this.todo = this.candidateList.filter((item) => {
        return item.process === "inpipeline";
      });
      this.done = this.candidateList.filter((item) => {
        return item.process === "hired";
      });
      this.review = this.candidateList.filter((item) => {
        return item.process === "dropped";
      });
    });
    this.jobsService.getRequistionDetail(this.id);
    this.jobsService.job$.subscribe((data) => {
      this.jobDetail = data;
      this.spinner.hide();
    });
  }

  switchTabs(index: number) {
    this.tabIndex = index;
  }

  switchStatus(id: string, status: boolean) {
    this.jobsService.switchStatus(status, id);
  }

  openAssign(data: any) {
    const modalRef = this.modalService.open(AssignJobsComponent, {
      centered: true,
    });
    modalRef.componentInstance.data = data;
  }

  openDelete(id: any) {
    const data = {
      id: id,
      action: "Job Requisition",
    };
    const modalRef = this.modalService.open(DeleteConfirmDialogComponent);
    modalRef.componentInstance.data = data;
  }
}
