import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { Observable, of } from "rxjs";
import { StoreState } from "./models/store-state";

@Injectable({
  providedIn: "root"
})
export class ClientAuthService extends ObservableStore<StoreState> {
  constructor() {
    super({ trackStateHistory: true });
  }

  public setClientKey(clientKey: string): void {
    this.setState({ clientKey }, "set_client_key");
  }

  public getClientKey() : Observable<string> {
    return of(this.getState().clientKey)
  }
}
