import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBottonComponent } from './player-botton.component';

describe('PlayerBottonComponent', () => {
  let component: PlayerBottonComponent;
  let fixture: ComponentFixture<PlayerBottonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerBottonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerBottonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
