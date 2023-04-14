import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import ICredentials from './models/ICredentials';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  authenticated: boolean = false;

  authenticate(credentials?: ICredentials, callback?: Function) {

    const headers = new HttpHeaders().set("Authorization", credentials ? `Basic ${btoa(credentials.username + ":" + credentials.password)}` : "")

    console.log(headers);

    this.http
      .post("http://localhost:8080/api/v1/login", { headers: headers })
      .subscribe((response: any) => {
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
