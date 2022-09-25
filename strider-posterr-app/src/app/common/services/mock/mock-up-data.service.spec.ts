import { TestBed } from '@angular/core/testing';

import { MockUpDataService } from './mock-up-data.service';

describe('MockUpDataService', () => {
  let service: MockUpDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockUpDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
