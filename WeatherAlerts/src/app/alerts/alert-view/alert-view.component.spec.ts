import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertViewComponent } from './alert-view.component';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('AlertViewComponent', () => {
  let component: AlertViewComponent;
  let fixture: ComponentFixture<AlertViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AlertViewComponent, 
      ],
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: { snapshot: {params: {id: 1}}}}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AlertViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
