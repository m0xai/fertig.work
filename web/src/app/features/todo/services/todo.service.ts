import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Todo } from '../models/todo';

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) {}

  public todos: Todo[] = [];

  todoUrl: string = 'http://127.0.0.1:8080/todos/';

  getTodos() {
    return this.http
      .get<Todo[]>(this.todoUrl)
      .pipe(retry(5), catchError(this.handleError));
  }

  showTodos() {
    this.getTodos().subscribe((data: Todo[]) => {
      data.forEach((todo: Todo) => this.todos.push(todo));
    });
  }

  todo: Todo = {
    id: 1,
    name: 'kerem',
    description: 'some description',
    isDone: true,
    isDraft: false,
    createdAt: new Date('2023-03-09T21:08:38.741+00:00'),
    updatedAt: new Date('2023-03-09T21:08:38.741+00:00'),
  };

  addTodo(): Observable<Todo> {
    return this.http
      .post<Todo>(this.todoUrl, this.todo)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
