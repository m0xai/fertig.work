import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private auth: AuthService, private http: HttpClient) {
    this.auth.authenticate(undefined, undefined);
  }


  logout() {
    this.auth.logout();
  }
}
