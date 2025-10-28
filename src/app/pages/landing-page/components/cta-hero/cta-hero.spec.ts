import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaHero } from './cta-hero';

describe('CtaHero', () => {
  let component: CtaHero;
  let fixture: ComponentFixture<CtaHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
