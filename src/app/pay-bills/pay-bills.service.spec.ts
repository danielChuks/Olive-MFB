import { TestBed } from '@angular/core/testing';

import { PayBillsService } from './pay-bills.service';

describe('PayBillsService', () => {
  let service: PayBillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayBillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
