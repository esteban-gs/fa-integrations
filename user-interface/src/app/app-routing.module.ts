import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "batches",
    loadChildren: () =>
      import("./batches/batches.module").then((m) => m.BatchesModule)
  },
  {
    path: "client-auth",
    loadChildren: () =>
      import("./client-auth/client-auth.module").then((m) => m.ClientAuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
