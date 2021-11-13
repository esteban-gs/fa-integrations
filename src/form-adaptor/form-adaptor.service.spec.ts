import { Test, TestingModule } from '@nestjs/testing';
import { FormAdaptorService } from './form-adaptor.service';

describe('FormAdaptorService', () => {
  let service: FormAdaptorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormAdaptorService],
    }).compile();

    service = module.get<FormAdaptorService>(FormAdaptorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
