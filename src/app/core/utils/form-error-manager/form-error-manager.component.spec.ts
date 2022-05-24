import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorManagerComponent } from './form-error-manager.component';

describe('FormErrorManagerComponent', () => {
  let component: FormErrorManagerComponent;
  let fixture: ComponentFixture<FormErrorManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormErrorManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
