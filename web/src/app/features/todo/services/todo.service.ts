import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {TodoModel} from '../models/todo';
import {ResourceService} from 'src/app/shared/resource.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService extends ResourceService<TodoModel> {
  constructor(private http: HttpClient) {
    super(http, TodoModel, 'http://127.0.0.1:8080/api/v1/tasks/');
  }
}
