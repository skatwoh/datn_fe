import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailComponent } from './service-detail.component';

describe('ServiceDetailComponent', () => {
  let component: ServiceDetailComponent;
  let fixture: ComponentFixture<ServiceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceDetailComponent]
    });
    fixture = TestBed.createComponent(ServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
