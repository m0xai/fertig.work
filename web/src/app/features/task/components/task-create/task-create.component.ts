import { Component, Input } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { ETaskPriority, ETaskStatus, Task } from "../../models/task.model";

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  @Input({required: true}) taskListId?: number;
  newTaskNameInput = "";

  constructor(private taskService: TaskService) {
  }

  addTaskToList() {
    this.createTaskFromInput(this.newTaskNameInput);
  }

  private createTaskFromInput(input: string) {
    if (input && this.taskListId) {
      const newTask = Task.create().withName(input).withPriority(ETaskPriority.NORMAL).withStatus(ETaskStatus.OPEN).withTaskList(this.taskListId).build();
      this.taskService.create(newTask).subscribe((value) => {
        console.log("Task Created: ", value)
      }, (error) => {
        console.warn("Error oldu su an", error)
      })
    }
  }
}
