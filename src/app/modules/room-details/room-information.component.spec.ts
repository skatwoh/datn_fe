import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInformationComponent } from './room-information.component';

describe('RoomInformationComponent', () => {
  let component: RoomInformationComponent;
  let fixture: ComponentFixture<RoomInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomInformationComponent]
    });
    fixture = TestBed.createComponent(RoomInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
