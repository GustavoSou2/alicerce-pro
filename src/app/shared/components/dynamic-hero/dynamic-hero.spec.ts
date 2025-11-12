import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicHero } from './dynamic-hero';

describe('DynamicHero', () => {
  let component: DynamicHero;
  let fixture: ComponentFixture<DynamicHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
