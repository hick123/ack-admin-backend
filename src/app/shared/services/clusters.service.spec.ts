import { TestBed } from '@angular/core/testing';

import { ClustersService } from './clusters.service';

describe('ClustersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClustersService = TestBed.get(ClustersService);
    expect(service).toBeTruthy();
  });
});
