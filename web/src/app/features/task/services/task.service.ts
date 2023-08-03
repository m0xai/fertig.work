import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from '../models/task.model';
import { ResourceService } from 'src/app/shared/resource.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends ResourceService<Task> {
  constructor(private http: HttpClient) {
    super(http, Task, 'tasks/');
  }

  // public getTasksByTaskList(taskListId: number): Task[] {
  //   return [new Task()]
  // }
}
