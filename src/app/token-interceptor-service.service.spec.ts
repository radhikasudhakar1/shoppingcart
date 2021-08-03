import { TestBed } from '@angular/core/testing';

import { TokenInterceptorServiceService } from './token-interceptor-service.service';

describe('TokenInterceptorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenInterceptorServiceService = TestBed.get(TokenInterceptorServiceService);
    expect(service).toBeTruthy();
  });
});
