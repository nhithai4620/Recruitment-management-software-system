import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCandidatesComponent } from './job-candidates.component';

describe('JobCandidatesComponent', () => {
  let component: JobCandidatesComponent;
  let fixture: ComponentFixture<JobCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCandidatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
