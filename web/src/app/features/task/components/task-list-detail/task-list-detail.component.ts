import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from "../../models/task-list.model";
import { TaskService } from "../../services/task.service";
import { Task } from 'src/app/features/task/models/task.model';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list-detail.component.html',
    styleUrls: ['./task-list-detail.component.css']
})
export class TaskListDetailComponent implements OnInit {
    @Input({required: true}) taskList: TaskList | undefined;
    public searchInTaskList = "";

    tasksOfList: Task[] = []

    constructor(private taskService: TaskService) {
    }

    getTasksByList() {
        this.taskService.getTasksByList(this.taskList?.id).subscribe((items) => {
            console.log(items)
            this.tasksOfList = items;
        })
    }

    ngOnInit(): void {
        this.getTasksByList()
    }

}
