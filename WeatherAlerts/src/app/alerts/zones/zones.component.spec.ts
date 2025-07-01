import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesComponent } from './zones.component';
import {provideHttpClient} from "@angular/common/http";

describe('ZonesComponent', () => {
  let component: ZonesComponent;
  let fixture: ComponentFixture<ZonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonesComponent],
      providers: [provideHttpClient()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
