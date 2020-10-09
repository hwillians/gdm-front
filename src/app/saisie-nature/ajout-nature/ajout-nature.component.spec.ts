import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutNatureComponent } from './ajout-nature.component';

describe('AjoutNatureComponent', () => {
  let component: AjoutNatureComponent;
  let fixture: ComponentFixture<AjoutNatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutNatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
