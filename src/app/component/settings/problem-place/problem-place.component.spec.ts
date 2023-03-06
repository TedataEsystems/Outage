import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemPlaceComponent } from './problem-place.component';

describe('ProblemPlaceComponent', () => {
  let component: ProblemPlaceComponent;
  let fixture: ComponentFixture<ProblemPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
