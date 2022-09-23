import { TestBed } from '@angular/core/testing';

import { HomePageStateService } from './home-page-state.service';

describe('HomePageStateService', () => {
  let service: HomePageStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomePageStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
