import { TestBed } from '@angular/core/testing';

import { LoginRequiredInterceptor } from './login-required.interceptor';

describe('LoginRequiredInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoginRequiredInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoginRequiredInterceptor = TestBed.inject(LoginRequiredInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
