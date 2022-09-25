import { TestBed } from '@angular/core/testing';

import { ScrollContentService } from './scroll-content.service';

describe('ScrollContentService', () => {
  let service: ScrollContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
