import { TestBed } from '@angular/core/testing';

import { IndexDatabaseService } from './index-database.service';

describe('IndexDatabaseService', () => {
  let service: IndexDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
