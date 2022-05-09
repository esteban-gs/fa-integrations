import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientAuthRoutingModule } from "./client-auth-routing.module";
import { ClientAuthContainerComponent } from "./client-auth-container.component";
import { ClientAuthMeComponent } from "./client-auth-me/client-auth-me.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import { TuiButtonModule, TuiErrorModule, TuiNotificationModule } from "@taiga-ui/core";

@NgModule({
  declarations: [ClientAuthContainerComponent, ClientAuthMeComponent],
  imports: [
    CommonModule,
    ClientAuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiIslandModule,
    TuiErrorModule,
    TuiNotificationModule
  ]
})
export class ClientAuthModule {}
