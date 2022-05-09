import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClientAuthService } from "src/app/stores/client-auth.service";

@Component({
  selector: "app-client-auth-me",
  templateUrl: "./client-auth-me.component.html",
  styles: []
})
export class ClientAuthMeComponent {
  readonly form: FormGroup;
  readonly clientKey: FormControl;
  public notifyFormFail: boolean = false;
  public notifyFormSuccess: boolean = false;

  constructor(private clientKeyStore: ClientAuthService) {
    this.clientKey = new FormControl("", [Validators.required]);

    this.form = new FormGroup({
      "client-key": this.clientKey
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      console.log(`FORM STATUS: VALID`);
      this.clientKeyStore.setClientKey(this.clientKey.value);
      this.notifyFormSuccess = true;
    } else {
      this.notifyFormFail = true;
    }
  }
}
