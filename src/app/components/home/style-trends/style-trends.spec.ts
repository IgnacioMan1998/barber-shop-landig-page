import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleTrends } from './style-trends';

describe('StyleTrends', () => {
  let component: StyleTrends;
  let fixture: ComponentFixture<StyleTrends>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyleTrends]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyleTrends);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
