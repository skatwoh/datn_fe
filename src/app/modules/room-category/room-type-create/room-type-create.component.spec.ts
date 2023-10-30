import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeCreateComponent } from './room-type-create.component';

describe('RoomTypeCreateComponent', () => {
  let component: RoomTypeCreateComponent;
  let fixture: ComponentFixture<RoomTypeCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomTypeCreateComponent]
    });
    fixture = TestBed.createComponent(RoomTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
