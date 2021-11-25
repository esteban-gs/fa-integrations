# Form Convert
A simple NestJs Rest API with a single controller that takes in a post request as http `form-data` and makes a post request to a given url as `application/json`. Built as part of a custom integration between Form Assembly's http post connector and O365 Power automate Post trigger. 

### Setting the repost url
The env variables in the `.env` file belong to a specific Power Automate Post trigger url. Example: `REPOST_TO_TRIGGER_URL_<UNIQUE_NAME>`.

Each variable name part should be unique. The name part gets passed with the form submission [form-convert.controller.ts](https://github.com/esteban-gs/form-convert/blob/c18b0e4d57a555908420c8d1a7453f9aa33289a7/src/form-convert/form-convert.controller.ts#L17)

``` typescript
@Post()
  async post(@Body() submission: any): Promise<any> {
    console.log(submission);
    if (!!!submission.triggerUrlId) {
      return new InternalServerErrorException('triggerUrlId is required');
    }
    const triggerUrl = this.configs.get(
      `REPOST_TO_TRIGGER_URL_${submission.triggerUrlId ?? 'BAB'}`,
    );

    // check for correct url pattern
    const validateDynamicTriggerUrl = triggerUrl
      .toString()
      .includes('.azure.com:443');

    if (!validateDynamicTriggerUrl) {
      return new BadRequestException('trigger url invalid');
    }

    Logger.log('request url', triggerUrl);
    Logger.log('payload', JSON.stringify(submission));
    const response = await this.http
      .post(triggerUrl, submission, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .toPromise();
  }
```
---
