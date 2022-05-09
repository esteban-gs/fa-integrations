import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { Row } from "../batches/models/batch-api-pieces";
import { StoreState } from "./models/store-state";

@Injectable({
  providedIn: "root"
})
export class BatchesStoreService extends ObservableStore<StoreState> {
  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });
    this.setBatch([]);
  }

  public setBatch(batch: Row[]): void {
    this.setState({ batch }, BatchesStoreActions.SetMany);
  }

  public getBatch(): Row[] {
    return this.getState().batch;
  }
}

export enum BatchesStoreActions {
  GetMany = "get_batch",
  SetMany = "set_batch"
}
