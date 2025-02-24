import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcoAutoComponent } from './parco-auto.component';

describe('ParcoAutoComponent', () => {
  let component: ParcoAutoComponent;
  let fixture: ComponentFixture<ParcoAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParcoAutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParcoAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
