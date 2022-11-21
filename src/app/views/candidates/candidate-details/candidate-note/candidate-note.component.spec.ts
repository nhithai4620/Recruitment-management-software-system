import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateNoteComponent } from './candidate-note.component';

describe('CandidateNoteComponent', () => {
  let component: CandidateNoteComponent;
  let fixture: ComponentFixture<CandidateNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
