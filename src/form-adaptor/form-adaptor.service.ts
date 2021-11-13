import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cheerio from 'cheerio';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
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
    customFields: IDynamicField[],
  ): IDynamicField[] {
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

    this.http
      .get(`${formUrl}`)
      .pipe(
        map((res) => res.data as string),
        catchError((err) => {
          Logger.log(err);
          return throwError(() => new Error(err));
        }),
      )
      .subscribe((resHtml: string) => {
        const html = resHtml;
        const $ = cheerio.load(html);

        // mutation
        requiredDynamicFields.map((field) => {
          const selector = `#${field.field}`;
          const value =
            $(selector).val() === undefined ? '' : $(selector).val();
          Logger.log(value, selector);
          field.value = value as string;
        });

        // mutation
        customFields.map((field) => {
          const selector = `#${field.field}`;
          const fieldName = $(selector).attr('title');
          Logger.log(fieldName, 'FIELD NAME');
          field.commonName = fieldName;
        });
      });
    Logger.log(JSON.stringify(requiredDynamicFields), 'requiredDynamicFields');
    Logger.log(JSON.stringify(customFields), 'test field ID');
    const combinedForm = requiredDynamicFields
      .concat(customFields)
      .concat(processorUrlAsField);
    Logger.log(JSON.stringify(combinedForm), 'combinedForm');

    return combinedForm;
  }

  public postToFormWithId(
    formId: string,
    processorUrl: string,
    formSubmission: any[],
  ) {
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
        tap((res) => console.log(res.statusText)),
        catchError((err) => {
          Logger.log(err);
          return throwError(() => new Error(err));
        }),
      );
  }
}
