import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import ICredentials from './models/ICredentials';
import { CookieService } from 'ngx-cookie-service';
import { ErrorService } from "../../../shared/services/error.service";
import { User } from "../../../features/user/models/user";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = "http://localhost:8080/api/v1/"

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private errorService: ErrorService) {
  }

  // We don't use resourceService, since we have JWT logic here.
  register(user: User) {
    const registerUrl = this.baseUrl + "users"
    return this.http.post(registerUrl, user, {observe: "response"})
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.ok) {
            console.log(response)
          }
        }, (error) => {
          this.errorService.setError(error.error.msg)
          console.warn(error)
        }
      );
  }

  authenticate(credentials?: ICredentials, callback?: Function) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const loginUrl = this.baseUrl + "login"

    this.http.post(loginUrl, credentials, {headers, observe: 'response'})
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.ok) {
            const jwt = response.body["token"]
            this.saveAuthToken(jwt);
          }
          return callback?.call(null);
        },
        (error) => {
          this.errorService.setError(error.error.msg);
        }
      );
  }

  logout() {
    this.http
      .post('http://localhost:8080/logout', [])
      .pipe(
        finalize(() => {
          this.removeAuthToken();
          this.router.navigateByUrl('/');
        })
      )
      .subscribe();
  }

  public getAuthToken() {
    return this.cookieService.get("jwt")
  }

  public isAuthenticated(): boolean {
    // If JWT Token set, it's longer than 0
    return this.getAuthToken().length > 0;
  }

  private saveAuthToken(token: string) {
    this.cookieService.set("jwt", token);
  }

  private removeAuthToken() {
    this.cookieService.delete("jwt", "/");
  }
}
