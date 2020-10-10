import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieNatureComponent } from './saisie-nature.component';

describe('SaisieNatureComponent', () => {
  let component: SaisieNatureComponent;
  let fixture: ComponentFixture<SaisieNatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaisieNatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaisieNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
