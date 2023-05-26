import { TestBed } from '@angular/core/testing';

import { RegisterDeviceService } from './register-device.service';

describe('RegisterDeviceService', () => {
  let service: RegisterDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
