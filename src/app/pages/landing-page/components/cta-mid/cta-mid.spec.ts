import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaMid } from './cta-mid';

describe('CtaMid', () => {
  let component: CtaMid;
  let fixture: ComponentFixture<CtaMid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaMid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaMid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
