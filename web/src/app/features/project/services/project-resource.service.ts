import { Injectable } from "@angular/core";
import { ResourceService } from "../../../shared/resource.service";
import { Project } from "../models/project.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class ProjectResourceService extends ResourceService<Project> {
	constructor(private http: HttpClient) {
		super(http, Project, "projects/");
	}
}
