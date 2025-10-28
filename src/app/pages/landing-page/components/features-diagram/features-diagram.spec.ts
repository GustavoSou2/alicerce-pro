import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesDiagram } from './features-diagram';

describe('FeaturesDiagram', () => {
  let component: FeaturesDiagram;
  let fixture: ComponentFixture<FeaturesDiagram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesDiagram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesDiagram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
