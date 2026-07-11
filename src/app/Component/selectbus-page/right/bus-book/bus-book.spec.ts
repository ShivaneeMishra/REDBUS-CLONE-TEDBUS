import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusBook } from './bus-book';

describe('BusBook', () => {
  let component: BusBook;
  let fixture: ComponentFixture<BusBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusBook],
    }).compileComponents();

    fixture = TestBed.createComponent(BusBook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
