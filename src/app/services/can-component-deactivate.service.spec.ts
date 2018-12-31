import { TestBed } from '@angular/core/testing';

import { CanComponentDeactivateService } from './can-component-deactivate.service';

describe('CanComponentDeactivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanComponentDeactivateService = TestBed.get(CanComponentDeactivateService);
    expect(service).toBeTruthy();
  });
});
