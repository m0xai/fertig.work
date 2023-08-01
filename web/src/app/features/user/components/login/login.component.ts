import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  credentials = {username: '', password: ''};

  login() {
    this.authService.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/home');
    });
  }
}
