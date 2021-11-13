import { FormAdaptorService } from './form-adaptor.service';
import { Body, Controller, Logger, Param, Post } from '@nestjs/common';
// import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { IDynamicField } from 'src/shared/interfaces';

@Controller('form-adaptor')
export class FormAdaptorController {
  constructor(
    private readonly formAdaptorService: FormAdaptorService,
    private readonly configs: ConfigService,
  ) {}

  @Post(':formId')
  async formAdaptor(
    @Param('formId') formId: string,
    @Body() form: IDynamicField,
  ) {
    const instanceUrl = this.configs.get('APP_BUILDER_INSTANCE_URL');
    const processorUrl = this.configs.get('APP_FORM_PROCESSOR_URL');
    const formUrl = `${instanceUrl}${formId}`;

    Logger.log(formUrl);

    // for testing only
    const customFields: IDynamicField[] = [
      { field: 'tfa_1', value: 'test from code name2' },
      { field: 'tfa_3', value: '100' },
      { field: 'tfa_5', value: 'test from code car' },
    ];

    const combinedForm = this.formAdaptorService.getFormBuilderCalculatedValues(
      formId,
      formUrl,
      customFields,
    );

    return this.formAdaptorService.postToFormWithId(
      formId,
      processorUrl,
      combinedForm,
    );
  }
}
