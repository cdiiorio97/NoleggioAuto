import { TestBed } from '@angular/core/testing';

import { TabellaService } from './tabella.service';

describe('TabellaService', () => {
  let service: TabellaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabellaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
