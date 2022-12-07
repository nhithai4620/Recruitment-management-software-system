import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateEvaluateComponent } from './candidate-evaluate.component';

describe('CandidateEvaluateComponent', () => {
  let component: CandidateEvaluateComponent;
  let fixture: ComponentFixture<CandidateEvaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateEvaluateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
