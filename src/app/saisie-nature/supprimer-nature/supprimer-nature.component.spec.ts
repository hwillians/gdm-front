import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerNatureComponent } from './supprimer-nature.component';

describe('SupprimerNatureComponent', () => {
  let component: SupprimerNatureComponent;
  let fixture: ComponentFixture<SupprimerNatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimerNatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
