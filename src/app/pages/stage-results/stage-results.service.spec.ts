import { TestBed } from '@angular/core/testing';

import { StageResultsService } from './stage-results.service';

describe('StageResultsService', () => {
  let service: StageResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StageResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
