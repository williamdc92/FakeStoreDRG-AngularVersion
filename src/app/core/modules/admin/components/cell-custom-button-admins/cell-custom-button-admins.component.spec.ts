import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomButtonAdminsComponent } from './cell-custom-button-admins.component';

describe('CellCustomButtonAdminsComponent', () => {
  let component: CellCustomButtonAdminsComponent;
  let fixture: ComponentFixture<CellCustomButtonAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomButtonAdminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomButtonAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
