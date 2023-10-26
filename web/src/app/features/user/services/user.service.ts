import { Injectable } from "@angular/core";
import { ResourceService } from "../../../shared/resource.service";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class UserService extends ResourceService<User> {
	constructor(private http: HttpClient) {
		super(http, User, "users/");
	}

	public search(emailQuery: string): Observable<User[]> {
		return this.httpClient
			.get<User[]>(this.apiBase + "users", { params: { emailQuery } })
			.pipe(map((result) => result.map((i) => new this.tConstructor(i))));
	}
}
