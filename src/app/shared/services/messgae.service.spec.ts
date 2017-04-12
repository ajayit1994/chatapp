import { TestBed, inject } from '@angular/core/testing';

import { MessgaeService } from './messgae.service';

describe('MessgaeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessgaeService]
    });
  });

  it('should ...', inject([MessgaeService], (service: MessgaeService) => {
    expect(service).toBeTruthy();
  }));
});
