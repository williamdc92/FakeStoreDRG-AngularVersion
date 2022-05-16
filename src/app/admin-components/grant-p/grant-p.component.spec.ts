import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantPComponent } from './grant-p.component';

describe('GrantPComponent', () => {
  let component: GrantPComponent;
  let fixture: ComponentFixture<GrantPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
