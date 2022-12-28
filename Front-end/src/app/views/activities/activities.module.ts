import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivitiesComponent } from "./activities.component";
import { AddActivitiesModule } from "./add-activities/add-activities.module";
import { RouterModule, Routes } from "@angular/router";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { FlatpickrModule } from "angularx-flatpickr";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatIconModule } from "@angular/material/icon";

const router: Routes = [
  {
    path: "",
    component: ActivitiesComponent,
    data: {
      title: "Activities",
    },
  },
];

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [
    CommonModule,
    AddActivitiesModule,
    RouterModule.forChild(router),
    NgbModalModule,
    FormsModule,
    NgbModule,
    MatIconModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [ActivitiesComponent],
})
export class ActivitiesModule {}
