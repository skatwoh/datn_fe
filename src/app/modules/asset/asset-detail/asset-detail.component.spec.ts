import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDetailComponent } from './asset-detail.component';

describe('AssetDetailComponent', () => {
  let component: AssetDetailComponent;
  let fixture: ComponentFixture<AssetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetDetailComponent]
    });
    fixture = TestBed.createComponent(AssetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
