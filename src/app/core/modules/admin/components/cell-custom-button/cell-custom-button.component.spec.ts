import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomButtonComponent } from './cell-custom-button.component';

describe('CellCustomButtonComponent', () => {
  let component: CellCustomButtonComponent;
  let fixture: ComponentFixture<CellCustomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
