import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletDeposit } from './wallet-deposit';

describe('WalletDeposit', () => {
  let component: WalletDeposit;
  let fixture: ComponentFixture<WalletDeposit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletDeposit],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletDeposit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
