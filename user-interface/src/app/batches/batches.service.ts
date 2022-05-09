import { Injectable } from '@angular/core';
import { map, Observable, zip } from 'rxjs';
import { ConfigurationsService } from '../stores/configurations.service';
import { IBatchApiPieces } from './models/batch-api-pieces';

@Injectable({
  providedIn: 'root'
})
export class BatchesService {

  constructor(private readonly appConf: ConfigurationsService) { }

  public getBatchApiParts(): Observable<IBatchApiPieces> {
    const restDbUrl$ = this.appConf.getConfiguration("APP_REST_DB_URL");
    const apiKey$ = this.appConf.getConfiguration("APP_REST_DB_API_KEY");
    const configPieces$ = zip(restDbUrl$, apiKey$).pipe(
      map(([restDbUrl, apiKey]) => ({
        restDbUrl: restDbUrl,
        apiKey: apiKey
      }))
    );
    return configPieces$;
  }
}
