import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketOverview } from './market-overview';

describe('MarketOverview', () => {
  let component: MarketOverview;
  let fixture: ComponentFixture<MarketOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
