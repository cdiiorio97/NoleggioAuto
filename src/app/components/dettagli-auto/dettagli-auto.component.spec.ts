import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliAutoComponent } from './dettagli-auto.component';

describe('DettagliAutoComponent', () => {
  let component: DettagliAutoComponent;
  let fixture: ComponentFixture<DettagliAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DettagliAutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DettagliAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
