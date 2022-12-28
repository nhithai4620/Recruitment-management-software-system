import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConvertTimePipe } from "./pipes/convert-time.pipe";

@NgModule({
  declarations: [ConvertTimePipe],
  imports: [CommonModule],
  exports: [ConvertTimePipe],
})
export class SharedModule {}
