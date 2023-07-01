import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResourceModel } from './ResourceModel';

@Injectable({
  providedIn: 'root',
})
export abstract class ResourceService<T extends ResourceModel<T>> {
  constructor(
    private httpClient: HttpClient,
    private tConstructor: { new(m: Partial<T>, ...args: unknown[]): T },
    private apiURL: string
  ) { }

  public create(resource: Partial<T> & { toJson: () => T }): Observable<T> {
    return this.httpClient
      .post<T>(`${this.apiURL}`, resource.toJson())
      .pipe(map((result) => new this.tConstructor(result)));
  }

  public fetch(): Observable<T[]> {
    //? Headers only set for other requests, that require authentication
    //   .set('withCredentials', 'true');
    return this.httpClient
      .get<T[]>(this.apiURL)
      .pipe(map((result) => result.map((i) => new this.tConstructor(i))));
  }

  public getById(id: number): Observable<T> {
    return this.httpClient
      .get<T>(`${this.apiURL}/${id}`)
      .pipe(map((result) => new this.tConstructor(result)));
  }

  public update(resource: Partial<T> & { toJson: () => T }): Observable<T> {
    return this.httpClient
      .put<T>(`${this.apiURL}/${resource.id}`, resource.toJson())
      .pipe(map((result) => new this.tConstructor(result)));
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/${id}`);
  }
}
