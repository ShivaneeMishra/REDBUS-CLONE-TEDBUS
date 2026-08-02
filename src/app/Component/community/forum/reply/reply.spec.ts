import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reply } from './reply';

describe('Reply', () => {
  let component: Reply;
  let fixture: ComponentFixture<Reply>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Reply],
    }).compileComponents();

    fixture = TestBed.createComponent(Reply);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
