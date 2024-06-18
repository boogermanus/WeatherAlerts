import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyZonesComponent } from './my-zones.component';

describe('MyZonesComponent', () => {
  let component: MyZonesComponent;
  let fixture: ComponentFixture<MyZonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyZonesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
