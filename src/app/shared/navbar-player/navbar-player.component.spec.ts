import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPlayerComponent } from './navbar-player.component';

describe('NavbarPlayerComponent', () => {
  let component: NavbarPlayerComponent;
  let fixture: ComponentFixture<NavbarPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
