import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliUtenteComponent } from './dettagli-utente.component';

describe('DettagliUtenteComponent', () => {
  let component: DettagliUtenteComponent;
  let fixture: ComponentFixture<DettagliUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DettagliUtenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DettagliUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
