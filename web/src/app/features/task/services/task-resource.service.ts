import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ResourceService } from "src/app/shared/resource.service";
import { Task } from "../models/task.model";
import { map, Observable } from "rxjs";

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
}
