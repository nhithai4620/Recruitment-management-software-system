import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobReportComponent } from './job-report.component';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { ChartjsModule } from '@coreui/angular-chartjs';
import {
  ButtonModule,
  CardModule,
  DropdownModule,
  GridModule,
  ProgressModule,
  SharedModule,
  WidgetModule,
} from '@coreui/angular';

@NgModule({
  declarations: [JobReportComponent],
  imports: [
    CommonModule,
    DocsComponentsModule,
    ChartjsModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    GridModule,
    ProgressModule,
    SharedModule,
    WidgetModule,
  ],
  exports: [JobReportComponent],
})
export class JobReportModule {}
