import { TestBed } from '@angular/core/testing';

import { AspectRatioService } from './aspect-ratio.service';

describe('AspectRatioService', () => {
  let service: AspectRatioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AspectRatioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
