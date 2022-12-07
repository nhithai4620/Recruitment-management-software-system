import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactDetailsComponent } from './contact-details.component';
import { MatButtonModule } from '@angular/material/button';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactDetailsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ContactDetailsModule {}
