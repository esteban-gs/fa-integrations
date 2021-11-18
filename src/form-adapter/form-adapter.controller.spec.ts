import { ConfigService } from '@nestjs/config';
import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientKeyGuard } from 'src/guards/client-key.guard';
import { IDynamicField } from 'src/shared/interfaces';
import { ConfigServiceSpy, FormAdaptorServiceSpy } from '../shared/spies';
import { FormAdapterController } from './form-adapter.controller';
import { FormAdaptorService } from './form-adapter.service';
import { cold } from 'jest-marbles';

describe('FormAdaptorController', () => {
  let controller: FormAdapterController;
  const mock_ForceFailGuard: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormAdapterController],
      providers: [
        { provide: FormAdaptorService, useClass: FormAdaptorServiceSpy },
        { provide: ConfigService, useClass: ConfigServiceSpy },
      ],
    })
      .overrideGuard(ClientKeyGuard)
      .useValue(mock_ForceFailGuard)
      .compile();

    controller = module.get<FormAdapterController>(FormAdapterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('form adaptor returns success code', async () => {
    const fakeForm: IDynamicField[] = [
      {
        field: 'tfa_1',
        value: '11-15-2021-at-2-55-pm',
      },
      {
        field: 'tfa_3',
        value: '100',
      },
      {
        field: 'tfa_5',
        value: 'test from code car',
      },
    ];
    const response$ = await controller.formAdaptor('12345', fakeForm);
    const expected$ = cold('(a|)', { a: 200, undefined });
    expect(response$).toBeObservable(expected$);
  });
});
