import { TestBed } from '@angular/core/testing';

import { ColorConvertService } from './color-convert.service';

describe('ColorConvertService', () => {
  let service: ColorConvertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorConvertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
