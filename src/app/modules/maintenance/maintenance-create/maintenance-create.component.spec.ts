import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceCreateComponent } from './maintenance-create.component';

describe('MaintenanceCreateComponent', () => {
  let component: MaintenanceCreateComponent;
  let fixture: ComponentFixture<MaintenanceCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceCreateComponent]
    });
    fixture = TestBed.createComponent(MaintenanceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
