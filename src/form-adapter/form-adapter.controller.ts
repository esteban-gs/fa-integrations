import { FormAdaptorService } from './form-adapter.service';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDynamicField } from 'src/shared/interfaces';
import { mergeMap } from 'rxjs';
import { ClientKeyGuard } from 'src/guards/client-key.guard';

@Controller('form-adaptor')
export class FormAdapterController {
  constructor(
    private readonly formAdaptorService: FormAdaptorService,
    private readonly configs: ConfigService,
  ) {}

  @UseGuards(ClientKeyGuard)
  @Post(':formId')
  async formAdaptor(
    @Param('formId') formId: string,
    @Body() form: IDynamicField[],
  ) {
    const instanceUrl = this.configs.get('APP_BUILDER_INSTANCE_URL');
    const processorUrl = this.configs.get('APP_FORM_PROCESSOR_URL');
    const formUrl = `${instanceUrl}/${formId}`;

    const combinedForm$ =
      this.formAdaptorService.getFormBuilderCalculatedValues(
        formId,
        formUrl,
        form,
      );
    const formSubmissionResult$ = combinedForm$.pipe(
      mergeMap((combinedForm: IDynamicField[]) =>
        this.formAdaptorService.processForm(processorUrl, combinedForm),
      ),
    );

    return formSubmissionResult$;
  }
}
