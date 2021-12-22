import { Test, TestingModule } from '@nestjs/testing';
import { LoggerMiddlewareService } from './logger-middleware.service';

describe('LoggerMiddlewareService', () => {
  let service: LoggerMiddlewareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerMiddlewareService],
    }).compile();

    service = module.get<LoggerMiddlewareService>(LoggerMiddlewareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
