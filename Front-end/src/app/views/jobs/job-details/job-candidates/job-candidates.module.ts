import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JobCandidatesComponent } from "./job-candidates.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatRadioModule } from "@angular/material/radio";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [JobCandidatesComponent],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [JobCandidatesComponent],
})
export class JobCandidatesModule {}
