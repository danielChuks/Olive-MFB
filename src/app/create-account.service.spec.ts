import { TestBed } from '@angular/core/testing';

import { CreateAccountService } from './auth/create-account/create-account.service';

describe('CreateAccountService', () => {
  let service: CreateAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
