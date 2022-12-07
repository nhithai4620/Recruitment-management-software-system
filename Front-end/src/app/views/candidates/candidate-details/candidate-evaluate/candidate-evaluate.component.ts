import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadService } from 'src/app/core/services/upload.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NoteComponent } from 'src/app/shared/components/note/note.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidatesService } from '../../../../core/services/candidates.service';

@Component({
  selector: 'app-candidate-evaluate',
  templateUrl: './candidate-evaluate.component.html',
  styleUrls: ['./candidate-evaluate.component.scss'],
})
export class CandidateEvaluateComponent implements OnInit {
  @Input() details: any;

  src: any;

  stepperOrientation: Observable<StepperOrientation>;

  _base64ToArrayBuffer(base64: any): Uint8Array {
    var binary_string = base64.replace(/\\n/g, '');
    binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer as Uint8Array;
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: [''],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: [''],
  });

  isEditable = true;

  currentRate = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private uploadService: UploadService,
    breakpointObserver: BreakpointObserver,
    private modalService: NgbModal,
    private candidatesService: CandidatesService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.uploadService.attachment$.subscribe((data: any) => {
      this.src = this._base64ToArrayBuffer(data.data);
    });
  }

  openNote(data: string) {
    const modalRef = this.modalService.open(NoteComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;
  }

  onComplete() {
    const data = {
      rating: this.currentRate,
    };
    this.candidatesService.updateCandidate(data, this.details._id);
  }
}
