import { TestBed } from '@angular/core/testing';

import { DatosReportesService } from './datos-reportes.service';

describe('DatosReportesService', () => {
  let service: DatosReportesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosReportesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
