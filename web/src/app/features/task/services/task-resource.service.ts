import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ResourceService } from "src/app/shared/resource.service";
import { Task } from "../models/task.model";
import { catchError, map, Observable, of } from "rxjs";
import { TasksCount } from "../models/task-count.model";

@Injectable({
	providedIn: "root",
})
export class TaskResourceService extends ResourceService<Task> {
	constructor(private http: HttpClient) {
		super(http, Task, "tasks/");
	}

	public getTasksByList(id: number | undefined): Observable<Task[]> {
		if (id == undefined) {
			Error("Task list id is invalid");
		}
		return this.httpClient
			.get<Task[]>(`${this.apiURL}from-list/${id}/`)
			.pipe(map((result) => result.map((i) => new this.tConstructor(i))));
	}

	public getTasksCountByProject(id: number | undefined): Observable<TasksCount> {
		if (id == undefined) {
			Error("Project ID were not provided.");
		}
		return this.httpClient.get<TasksCount>(`${this.apiURL}?projectId=${id}&stats`).pipe(
			map((response) => this.setUnDoneCount(response)),
			catchError((err) => {
				return of(err);
			}),
		);
	}

	public getLatest10Tasks(id: number | undefined) {
		if (id === undefined) {
			throw new Error("Project ID were not provided.");
		}
		return this.httpClient
			.get<Task[]>(`${this.apiURL}?projectId=${id}&count=10`)
			.pipe(map((result) => result.map((i) => new this.tConstructor(i))));
	}

	private setUnDoneCount(countsObj: TasksCount): TasksCount {
		const tmp = { ...countsObj };
		tmp.unDoneCount = tmp.totalCount - tmp.doneCount;
		return tmp;
	}
}
