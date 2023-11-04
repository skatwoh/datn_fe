import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCreateComponent } from './partner-create.component';

describe('PartnerCreateComponent', () => {
  let component: PartnerCreateComponent;
  let fixture: ComponentFixture<PartnerCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerCreateComponent]
    });
    fixture = TestBed.createComponent(PartnerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
