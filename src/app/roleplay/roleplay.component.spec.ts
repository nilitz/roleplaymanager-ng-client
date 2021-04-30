import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleplayComponent } from './roleplay.component';

describe('RoleplayComponent', () => {
  let component: RoleplayComponent;
  let fixture: ComponentFixture<RoleplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
