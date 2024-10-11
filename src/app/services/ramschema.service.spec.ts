import { TestBed } from '@angular/core/testing';

import { RamschemaService } from './ramschema.service';

describe('RamschemaService', () => {
  let service: RamschemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RamschemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
