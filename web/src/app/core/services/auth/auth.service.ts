import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import ICredentials from './models/ICredentials';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  private isAuthenticated = false;

  public get authenticated(): boolean {
    return this.isAuthenticated;
  }
  public set authenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  authenticate(credentials?: ICredentials, callback?: Function) {
    this.http
      .post('http://localhost:8080/api/v1/login', {
        username: credentials?.username,
        password: credentials?.password,
      })
      .subscribe((response: any) => {
        console.log(response);
        if (response['msg']) {
          this.authenticated = true;
          const jwt = response["token"]
          this.saveAuthToken(jwt);
        } else {
          this.authenticated = false;
        }
        return callback && callback();
      });
  }

  logout() {
    this.http
      .post('http://localhost:8080/logout', [])
      .pipe(
        finalize(() => {
          this.authenticated = false;
          this.router.navigateByUrl('/');
        })
      )
      .subscribe();
  }

  private saveAuthToken(token: string) {
    this.cookieService.set("jwt", token);
  }

  private removeAuthToken() {
    this.cookieService.delete("jwt");
  }

  public getAuthorizationToken() {
    return this.cookieService.get("jwt")
  }
}
