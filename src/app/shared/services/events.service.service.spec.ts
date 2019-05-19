import { TestBed } from '@angular/core/testing';

import { Events.ServiceService } from './events.service.service';

describe('Events.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Events.ServiceService = TestBed.get(Events.ServiceService);
    expect(service).toBeTruthy();
  });
});
