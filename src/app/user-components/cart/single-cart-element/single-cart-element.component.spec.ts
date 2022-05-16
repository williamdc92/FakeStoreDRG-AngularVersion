import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCartElementComponent } from './single-cart-element.component';

describe('SingleCartElementComponent', () => {
  let component: SingleCartElementComponent;
  let fixture: ComponentFixture<SingleCartElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCartElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCartElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
