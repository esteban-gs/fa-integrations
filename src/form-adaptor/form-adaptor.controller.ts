import { Controller } from '@nestjs/common';
import { FormAdaptorService } from './form-adaptor.service';

@Controller('form-adaptor')
export class FormAdaptorController {
  constructor(private readonly formAdaptorService: FormAdaptorService) {}
}
