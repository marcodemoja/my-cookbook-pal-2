import { TestBed } from '@angular/core/testing';

import { SpooncularApiInterceptor } from './nutritionx-api.interceptor';

describe('SpooncularApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SpooncularApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SpooncularApiInterceptor = TestBed.inject(SpooncularApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
