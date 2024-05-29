import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongLargeComponent } from './song-large.component';

describe('SongLargeComponent', () => {
  let component: SongLargeComponent;
  let fixture: ComponentFixture<SongLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongLargeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SongLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
