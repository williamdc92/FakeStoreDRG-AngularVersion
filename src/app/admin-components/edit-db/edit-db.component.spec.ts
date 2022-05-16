import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDbComponent } from './edit-db.component';

describe('EditDbComponent', () => {
  let component: EditDbComponent;
  let fixture: ComponentFixture<EditDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
