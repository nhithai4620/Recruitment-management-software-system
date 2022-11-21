import { TestBed } from '@angular/core/testing';

import { PermisitionService } from './permisition.service';

describe('PermisitionService', () => {
  let service: PermisitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
