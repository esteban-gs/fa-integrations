import { HttpClient } from "@angular/common/http";
import { Injectable, Optional, SkipSelf } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { map, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Configuration } from "./models/configuration";
import { StoreState } from "./models/store-state";

@Injectable({
  providedIn: "root"
})
export class ConfigurationsService extends ObservableStore<StoreState> {
  // private readonly apiEndpoint = `${environment.apiUrl}`;
  private readonly apiEndpoint = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    @Optional() @SkipSelf() parentModule?: ConfigurationsService
  ) {
    super({ trackStateHistory: true, logStateChanges: true });
    // enforce app singleton pattern
    if (parentModule) {
      throw new Error(
        "Singleton Service: ConfigurationsService already imported. Remove unecesserary imports"
      );
    }
  }

  private fetchConfigs() {
    return this.http
      .get<Configuration[]>(`@api-x/configurations`, {
        headers: {
          "client-key": "Secret1234$"
        }
      })
      .pipe(
        tap((configs: Configuration[]) => {
          this.setState({ configs }, ConfigurationStoreActions.GetMany);
        })
      );
  }

  public getConfigurations() {
    const state = this.getState();
    // pull from store cache
    if (state && state.configs) {
      console.log("stateHistory:", this.stateHistory);
      return of(state.configs);
    }
    // doesn't exist in store so fetch from server
    else {
      return this.fetchConfigs();
    }
  }

  public getConfiguration(key: string) {
    return this.getConfigurations().pipe(
      map((conf) => {
        let filtered = conf.filter((c) => c.key === key);
        let config = (
          filtered && filtered.length ? filtered[0] : null
        ) as Configuration;
        return config;
      })
    );
  }
}

export enum ConfigurationStoreActions {
  GetMany = "get_configurations"
}
