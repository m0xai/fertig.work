import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskActionsComponent } from './task-actions.component';

describe('TaskEditComponent', () => {
  let component: TaskActionsComponent;
  let fixture: ComponentFixture<TaskActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskActionsComponent]
    });
    fixture = TestBed.createComponent(TaskActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
