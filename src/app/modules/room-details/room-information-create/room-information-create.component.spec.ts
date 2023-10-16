import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInformationCreateComponent } from './room-information-create.component';

describe('RoomInformationCreateComponent', () => {
  let component: RoomInformationCreateComponent;
  let fixture: ComponentFixture<RoomInformationCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomInformationCreateComponent]
    });
    fixture = TestBed.createComponent(RoomInformationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
