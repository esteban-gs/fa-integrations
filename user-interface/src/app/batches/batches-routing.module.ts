import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BatchesListComponent } from "./batches-list/batches-list.component";
import { BatchesComponent } from "./batches.component";

const routes: Routes = [
  {
    path: "",
    component: BatchesComponent,
    children: [
      { path: "", redirectTo: "list" },
      { path: "list", component: BatchesListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchesRoutingModule {}
