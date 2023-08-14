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
  notes = [{name: "kerem", updated: false}, {name: "derya", updated: true}]
  folders = [{name: "kFerem", updated: false}, {name: "dFerya", updated: true}]
  public taskPriority = Object.values(ETaskPriority);
  public taskStatus = Object.values(ETaskStatus);

  taskForm = new FormGroup({
    name: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]}),
    description: new FormControl("", {nonNullable: true}),
    // TaskList should be in request, but not editable
    taskList: new FormControl<number>(0, {nonNullable: true}),
    createdBy: new FormControl<number>(0, {nonNullable: true}),
    priority: new FormControl(ETaskPriority.NORMAL, {nonNullable: true}),
    status: new FormControl(ETaskStatus.OPEN, {nonNullable: true})
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

  submitNewTask() {
    // TODO: This fields filled manually, for now
    this.taskForm.value.createdBy = this.tasks[0].createdBy
    this.taskForm.value.taskList = this.tasks[0].taskList
    this.taskService.create(new Task(this.taskForm.value)).subscribe((resp) => console.log(resp))
    // new Task(...this.taskForm.value, this.tasks[0].taskListId)
  }

  getErrorMessage() {
    return "Hoppla!"
  }
}
