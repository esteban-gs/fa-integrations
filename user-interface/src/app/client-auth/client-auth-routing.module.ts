import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientAuthContainerComponent } from "./client-auth-container.component";
import { ClientAuthMeComponent } from "./client-auth-me/client-auth-me.component";

const routes: Routes = [
  {
    path: "",
    component: ClientAuthContainerComponent,
    children: [
      { path: "", redirectTo: "me" },
      { path: "me", component: ClientAuthMeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientAuthRoutingModule {}
