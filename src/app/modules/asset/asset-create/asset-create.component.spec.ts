import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCreateComponent } from './asset-create.component';

describe('AssetCreateComponent', () => {
  let component: AssetCreateComponent;
  let fixture: ComponentFixture<AssetCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetCreateComponent]
    });
    fixture = TestBed.createComponent(AssetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
