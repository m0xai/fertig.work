import { Injectable } from '@angular/core';
import { ResourceService } from "../../../shared/resource.service";
import { TaskList } from "../models/task-list.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TaskListService extends ResourceService<TaskList> {
    constructor(private http: HttpClient) {
        super(http, TaskList, "tasklists/")
    }

}
