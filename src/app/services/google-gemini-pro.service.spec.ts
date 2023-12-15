import { TestBed } from '@angular/core/testing';

import { GoogleGeminiProService } from './google-gemini-pro.service';

describe('GoogleGeminiProService', () => {
  let service: GoogleGeminiProService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleGeminiProService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
