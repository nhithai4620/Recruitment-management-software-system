import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { CandidatesService } from "../../../../core/services/candidates.service";

@Component({
  selector: "app-job-candidates",
  templateUrl: "./job-candidates.component.html",
  styleUrls: ["./job-candidates.component.scss"],
})
export class JobCandidatesComponent implements OnInit {
  @Input() candidates: any[] = [];
  // @Input('cdkDragData') data: T;

  candidateList: any[] = [];

  title = "angular-material-drag-and-drop-lists";
  optionSelected = 1;

  todo: any[] = [];

  done: any[] = [];

  review: any = [];

  constructor(private candidateService: CandidatesService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.candidateList = this.candidates;
    this.todo = this.candidateList.filter((item) => {
      return item.process === "inpipeline";
    });
    this.done = this.candidateList.filter((item) => {
      return item.process === "hired";
    });
    this.review = this.candidateList.filter((item) => {
      return item.process === "dropped";
    });
  }

  onChange($event: any) {
    this.optionSelected = $event.value;
  }

  allowDrop = (drag: any, drop: any) => {
    // debugger;
    return true;
  };

  drop(event: CdkDragDrop<any[]>) {
    const data = event.previousContainer.data[event.currentIndex];
    if (event.container.id === "optionsList") {
      const candidate = {
        process: "inpipeline",
      };
      this.candidateService.updateCandidate(candidate, data._id);
    }
    if (event.container.id === "includeList") {
      const candidate = {
        process: "hired",
      };
      this.candidateService.updateCandidate(candidate, data._id);
    }
    if (event.container.id === "excludeList") {
      const candidate = {
        process: "dropped",
      };
      this.candidateService.updateCandidate(candidate, data._id);
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
