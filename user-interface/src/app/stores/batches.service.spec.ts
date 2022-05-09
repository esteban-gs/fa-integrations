import { TestBed } from '@angular/core/testing';

import { BatchesStoreService } from './batches-store.service';

describe('BatchesService', () => {
  let service: BatchesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
