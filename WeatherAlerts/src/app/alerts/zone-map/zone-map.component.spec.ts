import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneMapComponent } from './zone-map.component';
import {provideHttpClient} from "@angular/common/http";

describe('ZoneMapComponent', () => {
  let component: ZoneMapComponent;
  let fixture: ComponentFixture<ZoneMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneMapComponent],
      providers: [
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
