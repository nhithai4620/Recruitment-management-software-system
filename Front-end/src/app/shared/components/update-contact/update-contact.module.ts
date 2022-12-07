import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateContactComponent } from './update-contact.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [UpdateContactComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [UpdateContactComponent],
})
export class UpdateContactModule {}
