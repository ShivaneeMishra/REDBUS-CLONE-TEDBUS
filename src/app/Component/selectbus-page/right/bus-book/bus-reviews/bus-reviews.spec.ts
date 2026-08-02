import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusReviews } from './bus-reviews';

describe('BusReviews', () => {
  let component: BusReviews;
  let fixture: ComponentFixture<BusReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusReviews],
    }).compileComponents();

    fixture = TestBed.createComponent(BusReviews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
