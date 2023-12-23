import { Injectable } from "@angular/core";
import { ResourceService } from "../../../shared/resource.service";
import { Collaborator } from "../models/collaborator.model";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Project } from "../models/project.model";
import { User } from "../../user/models/user";

@Injectable({
	providedIn: "root",
})
export class CollaboratorResourceService extends ResourceService<Collaborator> {
	constructor(private http: HttpClient) {
		super(http, Collaborator, "collaborators/");
	}

	public createCollaborator(user: User, project: Project) {
		// TODO: Fill this information before release with latest Collaborator changes
		return new Collaborator({
			user: user.getId(),
			project: project.getId(),
			role: "Basic",
			isJoined: true,
			joinedOn: undefined,
			isInvited: false,
			invitedOn: undefined,
		});
	}

	public createBulk(resource: Partial<Array<Collaborator>>): Observable<Array<Collaborator>> {
		return this.httpClient
			.post<Array<Collaborator>>(`${this.apiURL}bulk/`, JSON.parse(JSON.stringify(resource)))
			.pipe(
				map((results) => {
					return results.map((result) => new this.tConstructor(result));
				}),
			);
	}

	public list(projectId: number): Observable<Collaborator[]> {
		return this.httpClient
			.get<Collaborator[]>(`${this.apiURL}?projectId=${projectId}`)
			.pipe(map((result) => result.map((value) => new this.tConstructor(value))));
	}
}
