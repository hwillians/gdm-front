import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMissionComponent } from './gestion-mission.component';

describe('GestionMissionComponent', () => {
  let component: GestionMissionComponent;
  let fixture: ComponentFixture<GestionMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
