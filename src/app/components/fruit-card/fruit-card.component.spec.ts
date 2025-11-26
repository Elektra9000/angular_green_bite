import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitCardComponent } from './fruit-card.component';

describe('FruitCardComponent', () => {
  let component: FruitCardComponent;
  let fixture: ComponentFixture<FruitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruitCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FruitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
