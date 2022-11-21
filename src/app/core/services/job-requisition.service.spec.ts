import { TestBed } from '@angular/core/testing';

import { JobRequisitionService } from './job-requisition.service';

describe('JobRequisitionService', () => {
  let service: JobRequisitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobRequisitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
