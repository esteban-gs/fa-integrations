import { Test, TestingModule } from '@nestjs/testing';
import { FormAdaptorController } from './form-adaptor.controller';
import { FormAdaptorService } from './form-adaptor.service';

describe('FormAdaptorController', () => {
  let controller: FormAdaptorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormAdaptorController],
      providers: [FormAdaptorService],
    }).compile();

    controller = module.get<FormAdaptorController>(FormAdaptorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
