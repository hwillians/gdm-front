import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemadeMissionComponent } from './demade-mission.component';

describe('DemadeMissionComponent', () => {
  let component: DemadeMissionComponent;
  let fixture: ComponentFixture<DemadeMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemadeMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemadeMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
