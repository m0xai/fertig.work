import { Component, Input } from '@angular/core';
import { TaskList } from "../../models/task-list.model";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  @Input({required: true}) taskList: TaskList | undefined;
  public searchInTaskList = "";
}
