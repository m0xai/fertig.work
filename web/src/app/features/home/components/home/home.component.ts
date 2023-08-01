import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private auth: AuthService, private http: HttpClient) { }
  logout() {
    this.auth.logout();
  }
}
