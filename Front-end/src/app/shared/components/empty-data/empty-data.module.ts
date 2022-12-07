import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDataComponent } from './empty-data.component';
import { AddActivitiesModule } from '../../../views/activities/add-activities/add-activities.module';

@NgModule({
  declarations: [EmptyDataComponent],
  imports: [CommonModule, AddActivitiesModule],
  exports: [EmptyDataComponent],
})
export class EmptyDataModule {}
