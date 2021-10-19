import { Test, TestingModule } from '@nestjs/testing';
import { FormConvertController } from './form-convert.controller';

describe('FormConvertController', () => {
  let controller: FormConvertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormConvertController],
    }).compile();

    controller = module.get<FormConvertController>(FormConvertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
