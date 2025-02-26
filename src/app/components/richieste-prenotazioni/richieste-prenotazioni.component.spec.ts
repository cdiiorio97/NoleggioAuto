import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiestePrenotazioniComponent } from './richieste-prenotazioni.component';

describe('RichiestePrenotazioniComponent', () => {
  let component: RichiestePrenotazioniComponent;
  let fixture: ComponentFixture<RichiestePrenotazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RichiestePrenotazioniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RichiestePrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
