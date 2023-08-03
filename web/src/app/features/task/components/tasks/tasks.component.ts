import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ETaskPriority, ETaskStatus, Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from "@angular/router";
import { TitleService } from "../../../../shared/services/title.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  public taskPriority = Object.values(ETaskPriority);
  public taskStatus = Object.values(ETaskStatus);
  taskForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    // TaskList should be in request, but not editable
    // taskList: new FormControl()
    priority: new FormControl(ETaskPriority.NORMAL),
    status: new FormControl(ETaskStatus.OPEN)
  })

  constructor(private taskService: TaskService, private http: HttpClient, private route: ActivatedRoute, private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.route.snapshot.data["title"])
    this.getTasks();
  }

  getTasks() {
    this.taskService.fetch().subscribe((tasks: Task[]) => {
      this.tasks = [...tasks];
    });
  }

  getErrorMessage() {
    return "Hoppla!"
  }
}
