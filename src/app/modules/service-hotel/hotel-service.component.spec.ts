import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHotelComponent } from './hotel-service.component';

describe('HotelServiceComponent', () => {
  let component: ServiceHotelComponent;
  let fixture: ComponentFixture<ServiceHotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceHotelComponent]
    });
    fixture = TestBed.createComponent(ServiceHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
