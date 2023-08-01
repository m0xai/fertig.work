import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private auth: AuthService, private http: HttpClient) {
  }

  logout() {
    this.auth.logout();
  }

}
