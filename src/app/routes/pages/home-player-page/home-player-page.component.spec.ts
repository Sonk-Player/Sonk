import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePlayerPageComponent } from './home-player-page.component';

describe('HomePlayerPageComponent', () => {
  let component: HomePlayerPageComponent;
  let fixture: ComponentFixture<HomePlayerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePlayerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePlayerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
