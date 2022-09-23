import { TestBed } from '@angular/core/testing';

import { PostRestService } from './post-rest-service';

describe('PostRestService', () => {
  let service: PostRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
