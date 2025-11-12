import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCellRenderer } from './custom-cell-renderer';

describe('CustomCellRenderer', () => {
  let component: CustomCellRenderer;
  let fixture: ComponentFixture<CustomCellRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCellRenderer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomCellRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
