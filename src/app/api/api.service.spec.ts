import { TestBed, async, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, HttpClientModule],
    providers: [ApiService]
  }));

  it('should be created', () => {
      const service: ApiService = TestBed.get(ApiService);
      expect(service).toBeTruthy();
    });
});
