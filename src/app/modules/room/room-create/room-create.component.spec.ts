import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCreateComponent } from './room-create.component';

describe('RoomCreateComponent', () => {
  let component: RoomCreateComponent;
  let fixture: ComponentFixture<RoomCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomCreateComponent]
    });
    fixture = TestBed.createComponent(RoomCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
