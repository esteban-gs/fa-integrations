import { Test, TestingModule } from '@nestjs/testing';
import { FormConvertService } from './form-convert.service';

describe('FormConvertService', () => {
  let service: FormConvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormConvertService],
    }).compile();

    service = module.get<FormConvertService>(FormConvertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
