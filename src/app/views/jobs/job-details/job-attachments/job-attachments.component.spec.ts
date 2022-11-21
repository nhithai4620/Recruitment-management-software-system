import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAttachmentsComponent } from './job-attachments.component';

describe('JobAttachmentsComponent', () => {
  let component: JobAttachmentsComponent;
  let fixture: ComponentFixture<JobAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAttachmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
