import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactTabComponent } from './contact-tab.component';
import { MatButtonModule } from '@angular/material/button';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateContactModule } from '../../../../shared/components/update-contact/update-contact.module';

@NgModule({
  declarations: [ContactTabComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    UpdateContactModule,
  ],
  exports: [ContactTabComponent],
})
export class ContactTabModule {}
