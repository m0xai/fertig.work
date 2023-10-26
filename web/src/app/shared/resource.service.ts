import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ResourceModel } from "./ResourceModel";

@Injectable({
	providedIn: "root",
})
export abstract class ResourceService<T extends ResourceModel<T>> {
	public apiURL = "";
	public apiBase = "http://127.0.0.1:8080/api/v1/";

	constructor(
		public httpClient: HttpClient,
		public tConstructor: { new (m: Partial<T>, ...args: unknown[]): T },
		private apiPath: string,
	) {
		this.apiURL = this.apiBase + apiPath;
	}

	public create(resource: Partial<T> & { toJson: () => T }): Observable<T> {
		return this.httpClient
			.post<T>(`${this.apiURL}`, resource.toJson())
			.pipe(map((result) => new this.tConstructor(result)));
	}

	public fetch(): Observable<T[]> {
		return this.httpClient
			.get<T[]>(this.apiURL)
			.pipe(map((result) => result.map((i) => new this.tConstructor(i))));
	}

	public getById(id: number): Observable<T> {
		return this.httpClient
			.get<T>(`${this.apiURL}${id}/`)
			.pipe(map((result) => new this.tConstructor(result)));
	}

	public update(resource: Partial<T> & { toJson: () => T }): Observable<T> {
		return this.httpClient
			.put<T>(`${this.apiURL}${resource.id}/`, resource.toJson())
			.pipe(map((result) => new this.tConstructor(result)));
	}

	public partialUpdate(resource: Partial<T> & { toJson: () => T }): Observable<T> {
		return this.httpClient
			.patch<T>(`${this.apiURL}${resource.id}/`, resource.toJson())
			.pipe(map((result) => new this.tConstructor(result)));
	}

	public delete(id: number): Observable<T> {
		return this.httpClient.delete<T>(`${this.apiURL}${id}/`);
	}
}
