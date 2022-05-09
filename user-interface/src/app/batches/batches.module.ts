import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BatchesRoutingModule } from "./batches-routing.module";
import { BatchesComponent } from "./batches.component";
import { BatchesListComponent } from "./batches-list/batches-list.component";
import { HttpClientModule } from "@angular/common/http";

import { TuiInputFileModule } from "@taiga-ui/kit";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiNotificationsModule, TuiRootModule } from "@taiga-ui/core";

@NgModule({
  declarations: [BatchesComponent, BatchesListComponent],
  imports: [
    CommonModule,
    BatchesRoutingModule,
    HttpClientModule,
    TuiInputFileModule,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiNotificationsModule,
    TuiRootModule
  ]
})
export class BatchesModule {}
