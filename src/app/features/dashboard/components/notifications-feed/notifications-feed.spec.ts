import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsFeed } from './notifications-feed';

describe('NotificationsFeed', () => {
  let component: NotificationsFeed;
  let fixture: ComponentFixture<NotificationsFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsFeed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsFeed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
