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

  authenticated: boolean = false;

  authenticate(credentials?: ICredentials, callback?: Function) {
    const headers = new HttpHeaders(
      credentials
        ? {
            authorization:
              'Basic ' +
              btoa(credentials.username + ':' + credentials.password),
          }
        : {}
    );

    this.http.get('user', { headers: headers }).subscribe((response: any) => {
      if (response['name']) {
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
