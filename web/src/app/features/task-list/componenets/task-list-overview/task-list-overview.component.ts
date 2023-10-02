import { Component, OnInit } from '@angular/core';
import { TaskListService } from "../../services/task-list.service";
import { TaskList } from "../../models/task-list.model";

@Component({
  selector: 'app-task-list-overview',
  templateUrl: './task-list-overview.component.html',
  styleUrls: ['./task-list-overview.component.css']
})
export class TaskListOverviewComponent implements OnInit {
  // fetch task list here
  taskListList: TaskList[] = []

  constructor(private taskListService: TaskListService) {
  }

  getAllTaskList() {
    this.taskListService.fetch().subscribe((items) => {
      // Swallow copy with spread operator is okay here, since we have only one level in data structure
      this.taskListList = [...items]
    })
  }

  ngOnInit(): void {
    this.getAllTaskList();
  }
}
