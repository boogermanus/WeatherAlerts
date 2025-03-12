import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyZonesComponent } from './my-zones.component';
import { provideHttpClient } from '@angular/common/http';

describe('MyZonesComponent', () => {
  let component: MyZonesComponent;
  let fixture: ComponentFixture<MyZonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyZonesComponent],
      providers: [
        provideHttpClient()
      ]
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
