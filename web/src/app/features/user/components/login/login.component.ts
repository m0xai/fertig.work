import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  credentials = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  login() {

    if (this.credentials.valid) {
      this.authService.authenticate({
        username: this.credentials.value.username,
        password: this.credentials.value.password
      }, () => {
        this.router.navigateByUrl('/home');
      });
    }

  }

  getErrorMessage(fieldName: string) {
    if (this.credentials.get(fieldName)!.hasError('required')) {
      return 'You must enter a value';
    }
    return "Please enter a valid " + fieldName;
  }
}
