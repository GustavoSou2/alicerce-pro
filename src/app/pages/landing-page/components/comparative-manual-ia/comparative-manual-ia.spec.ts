import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativeManualIa } from './comparative-manual-ia';

describe('ComparativeManualIa', () => {
  let component: ComparativeManualIa;
  let fixture: ComponentFixture<ComparativeManualIa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparativeManualIa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparativeManualIa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
