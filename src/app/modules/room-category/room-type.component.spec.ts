import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeComponent } from './room-type.component';

describe('RoomCategoryComponent', () => {
  let component: RoomTypeComponent;
  let fixture: ComponentFixture<RoomTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomTypeComponent]
    });
    fixture = TestBed.createComponent(RoomTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
