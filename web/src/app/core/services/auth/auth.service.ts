import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {finalize} from 'rxjs';
import ICredentials from './models/ICredentials';
import {CookieService} from 'ngx-cookie-service';
import {ErrorService} from "../../../shared/services/error.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private errorSerivce: ErrorService) {
  }

  authenticate(credentials?: ICredentials, callback?: Function) {
    const url = 'http://localhost:8080/api/v1/login';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post(url, credentials, {headers, observe: 'response'})
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.ok) {
            const jwt = response.body["token"]
            this.saveAuthToken(jwt);
          }
          return callback && callback();
        },
        (error) => {
          this.errorSerivce.setError(error.error.msg);
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

  private saveAuthToken(token: string) {
    this.cookieService.set("jwt", token);
  }

  private removeAuthToken() {
    this.cookieService.delete("jwt");
  }

  public getAuthToken() {
    return this.cookieService.get("jwt")
  }

  public isAuthenticated(): boolean {
    // If JWT Token set, it's longer than 0
    return this.getAuthToken().length > 0;
  }
}
