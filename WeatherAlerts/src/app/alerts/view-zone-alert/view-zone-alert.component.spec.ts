import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewZoneAlertComponent } from './view-zone-alert.component';

describe('ViewZoneAlertComponent', () => {
  let component: ViewZoneAlertComponent;
  let fixture: ComponentFixture<ViewZoneAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewZoneAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewZoneAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
