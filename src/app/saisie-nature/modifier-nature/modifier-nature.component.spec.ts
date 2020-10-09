import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierNatureComponent } from './modifier-nature.component';

describe('ModifierNatureComponent', () => {
  let component: ModifierNatureComponent;
  let fixture: ComponentFixture<ModifierNatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierNatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
