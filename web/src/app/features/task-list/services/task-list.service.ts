import { Injectable } from "@angular/core";
import { ResourceService } from "../../../shared/resource.service";
import { TaskList } from "../models/task-list.model";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class TaskListService extends ResourceService<TaskList> {
	constructor(private http: HttpClient) {
		super(http, TaskList, "tasklists/");
	}

	public fetchByProject(projectId: number): Observable<TaskList[]> {
		return this.httpClient
			.get<TaskList[]>(this.apiURL + "?projectId=" + projectId)
			.pipe(map((result) => result.map((i) => new this.tConstructor(i))));
	}
}
