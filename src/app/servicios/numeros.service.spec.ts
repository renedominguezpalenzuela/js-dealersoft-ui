import { TestBed } from '@angular/core/testing';

import { NumerosService } from './numeros.service';

describe('NumerosService', () => {
  let service: NumerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
