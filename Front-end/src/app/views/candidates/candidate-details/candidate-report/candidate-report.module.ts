import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateReportComponent } from './candidate-report.component';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
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
  declarations: [CandidateReportComponent],
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
  exports: [CandidateReportComponent],
})
export class CandidateReportModule {}
