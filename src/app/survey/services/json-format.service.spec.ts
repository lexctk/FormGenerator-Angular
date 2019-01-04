import { TestBed } from '@angular/core/testing';

import { JsonFormatService } from './json-format.service';

describe('JsonFormatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonFormatService = TestBed.get(JsonFormatService);
    expect(service).toBeTruthy();
  });
});
