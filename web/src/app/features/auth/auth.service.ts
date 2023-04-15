import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import ICredentials from './models/ICredentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private isAuthenticated: boolean = false;

  public get authenticated(): boolean {
    return this.isAuthenticated;
  }
  public set authenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  authenticate(credentials?: ICredentials, callback?: Function) {
    //? Headers only set for other requests, that require authentication
    // const headers = new HttpHeaders()
    //   .set(
    //     'Authorization',
    //     credentials
    //       ? `Basic ${btoa(credentials.username + ':' + credentials.password)}`
    //       : ''
    //   )
    //   .set('withCredentials', 'true');

    this.http
      .post('http://localhost:8080/api/v1/login', {
        username: credentials?.username,
        password: credentials?.password,
      })
      .subscribe((response: any) => {
        console.log(response);
        if (response['msg']) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
        return callback && callback();
      });
  }

  logout() {
    this.http
      .post('logout', [])
      .pipe(
        finalize(() => {
          this.authenticated = false;
          this.router.navigateByUrl('/login');
        })
      )
      .subscribe();
  }
}
