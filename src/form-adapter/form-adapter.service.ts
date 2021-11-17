import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cheerio, { CheerioAPI } from 'cheerio';
import { AxiosResponse } from 'axios';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { IDynamicField } from 'src/shared/interfaces';

@Injectable()
export class FormAdaptorService {
  constructor(
    private readonly http: HttpService,
    private readonly configs: ConfigService,
  ) {}

  public getFormBuilderCalculatedValues(
    formId: string,
    formUrl: string,
    form: IDynamicField[],
  ): Observable<IDynamicField[]> {
    const referrer = this.configs.get('APP_FORM_ADAPTOR_REFERRER');

    /**
     * These fields are always present in forms and are dynamically calculated,
     * over time they may change
     */
    const requiredDynamicFields: IDynamicField[] = [
      {
        field: 'tfa_dbCounters',
        value: '',
      },
      {
        field: 'tfa_dbControl',
        value: '',
      },
      {
        field: 'tfa_dbTimeStarted',
        value: '',
      },
      {
        field: 'tfa_dbVersionId',
        value: '',
      },
    ];

    const processorUrlAsField: IDynamicField[] = [
      { field: 'tfa_dbFormId', value: formId },
      {
        field: 'tfa_referrer',
        value: referrer,
      },
    ];

    const $buildForm: Observable<IDynamicField[]> = this.http
      .get(`${formUrl}`)
      .pipe(
        map((res: AxiosResponse) => {
          const html = res.data as string;
          const $: CheerioAPI = cheerio.load(html);

          // mutation
          requiredDynamicFields.map((field: IDynamicField) => {
            const selector = `#${field.field}`;
            const value =
              $(selector).val() === undefined ? '' : $(selector).val();
            Logger.log(value, selector);
            field.value = value as string;
          });

          // mutation
          form.map((field: IDynamicField) => {
            const selector = `#${field.field}`;
            const fieldName = $(selector).attr('title');
            Logger.log(fieldName, field.field);
            field.commonName = fieldName;
          });
          const combinedForm: IDynamicField[] = requiredDynamicFields
            .concat(form)
            .concat(processorUrlAsField);
          Logger.log(JSON.stringify(combinedForm), 'combinedForm');

          return combinedForm;
        }),
        catchError((err) => {
          Logger.error(err, 'ERROR CAUGHT IN PIPE');
          return throwError(() => new Error(err));
        }),
      );
    return $buildForm;
  }

  public processForm(
    processorUrl: string,
    formSubmission: any[],
  ): Observable<number | AxiosResponse<number, any>> {
    const params = new URLSearchParams();
    formSubmission.forEach((i) => {
      params.append(i.field, i.value);
    });

    return this.http
      .post(processorUrl, params, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        tap((res) => Logger.log(res.statusText, 'FORM SUBMIT RESULT')),
        map((res) => res.status),
        catchError((err) => {
          Logger.error(err);
          return throwError(() => new Error(err));
        }),
      );
  }
}
