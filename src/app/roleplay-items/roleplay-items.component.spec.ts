import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleplayItemsComponent } from './roleplay-items.component';

describe('RoleplayItemsComponent', () => {
  let component: RoleplayItemsComponent;
  let fixture: ComponentFixture<RoleplayItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleplayItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleplayItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
