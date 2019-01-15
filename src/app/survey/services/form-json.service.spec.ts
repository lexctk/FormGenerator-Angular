import { TestBed } from '@angular/core/testing';

import { FormJsonService } from './form-json.service';

describe('FormJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormJsonService = TestBed.get(FormJsonService);
    expect(service).toBeTruthy();
  });
});
