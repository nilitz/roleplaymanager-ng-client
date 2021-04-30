import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleplayDetailComponent } from './roleplay-detail.component';

describe('RoleplayDetailComponent', () => {
  let component: RoleplayDetailComponent;
  let fixture: ComponentFixture<RoleplayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleplayDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleplayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
