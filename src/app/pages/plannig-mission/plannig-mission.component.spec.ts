import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannigMissionComponent } from './plannig-mission.component';

describe('PlannigMissionComponent', () => {
  let component: PlannigMissionComponent;
  let fixture: ComponentFixture<PlannigMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannigMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannigMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
