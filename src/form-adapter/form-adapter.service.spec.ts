import { HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigServiceSpy, HttpServiceSpy } from 'src/shared/spies';
import { FormAdaptorService as FormAdapterService } from './form-adapter.service';

describe('FormAdaptorService', () => {
  let service: FormAdapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        FormAdapterService,
        { provide: ConfigServiceSpy, useClass: ConfigServiceSpy },
        { provide: HttpService, useClass: HttpServiceSpy },
      ],
    }).compile();

    service = module.get<FormAdapterService>(FormAdapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
