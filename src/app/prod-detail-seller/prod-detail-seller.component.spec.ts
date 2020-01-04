import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdDetailSellerComponent } from './prod-detail-seller.component';

describe('ProdDetailSellerComponent', () => {
  let component: ProdDetailSellerComponent;
  let fixture: ComponentFixture<ProdDetailSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdDetailSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdDetailSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
