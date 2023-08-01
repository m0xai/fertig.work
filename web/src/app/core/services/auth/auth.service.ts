import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {finalize} from 'rxjs';
import ICredentials from './models/ICredentials';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
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
          this.setAuthenticated(true);
          const jwt = response["token"]
          this.saveAuthToken(jwt);
        } else {
          this.setAuthenticated(false);
        }
        return callback && callback();
      });
  }

  logout() {
    this.http
      .post('http://localhost:8080/logout', [])
      .pipe(
        finalize(() => {
          this.setAuthenticated(false);
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

  public getAuthorizationToken() {
    return this.cookieService.get("jwt")
  }

  public setAuthenticated(state: boolean): void {
    localStorage.setItem("isLoggedIn", state + "");
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem("isLoggedIn") == "true";
  }
}
