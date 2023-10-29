import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInformationDetailsComponent } from './room-information-details.component';

describe('RoomInformationDetailsComponent', () => {
  let component: RoomInformationDetailsComponent;
  let fixture: ComponentFixture<RoomInformationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomInformationDetailsComponent]
    });
    fixture = TestBed.createComponent(RoomInformationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
