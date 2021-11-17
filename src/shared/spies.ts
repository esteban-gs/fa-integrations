import { of } from 'rxjs';
import { fakeDynamicFields } from './fakes';
import { IDynamicField } from './interfaces';

export class FormAdaptorServiceSpy {
  fakeFormSubmitResponse = 200;
  fakeFields = { ...fakeDynamicFields };

  getFormBuilderCalculatedValues = jest.fn(
    (formId: string, formUrl: string, form: IDynamicField[]) =>
      of([...fakeDynamicFields, ...form]),
  );

  processForm = jest.fn((processorUrl: string, formSubmission: any[]) =>
    of(this.fakeFormSubmitResponse),
  );
}

export class ConfigServiceSpy {
  get = jest.fn((id: string) => `${id}_and_its_value`);
}

export class HttpServiceSpy {
  get = jest.fn((fakeUrl: string) => {
    let result = '';
    switch (fakeUrl) {
      case 'formAdapterSnapshot':
        result = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <meta name="description" content="TEST">
  </head>
  <body> 
    <form method="post" action="https://example.com" role="form">
      <input value="962" name="tfa_dbCounters" id="tfa_dbCounters" autocomplete="off">
      <input value="1234" name="tfa_dbFormId" id="tfa_dbFormId">
      <input value="0aec596ca20c0280b1206f5729e08fc4" name="tfa_dbControl" id="tfa_dbControl">
      <input value="1637089473" name="tfa_dbTimeStarted" id="tfa_dbTimeStarted">
      <input value="2" name="tfa_dbVersionId" id="tfa_dbVersionId">
    </form>
  </body>
</html>`;
        break;
    }
    return result;
  });
}
