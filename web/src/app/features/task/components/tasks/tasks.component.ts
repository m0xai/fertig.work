import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ETaskPriority, ETaskStatus, Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from "@angular/router";
import { TitleService } from "../../../../shared/services/title.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
]

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  notes = [{name: "This is just a note text to show on screeen", updated: false}, {
    name: "This is just another note" +
      " text to show on screeen", updated: true
  }]
  folders = [{name: "Folder A", updated: false}, {name: "Folder B", updated: true}]
  public taskPriority = Object.values(ETaskPriority);
  public taskStatus = Object.values(ETaskStatus);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

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
  }

  getErrorMessage() {
    return "Hoppla!"
  }
}
