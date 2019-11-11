import { TestBed, inject } from '@angular/core/testing';

import { AggregateTitleService } from './aggregate-title.service';

describe('AggregateTitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AggregateTitleService]
    });
  });

  it('should be created', inject([AggregateTitleService], (service: AggregateTitleService) => {
    expect(service).toBeTruthy();
  }));
});
