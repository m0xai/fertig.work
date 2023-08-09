import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ErrorService } from "../../../../shared/services/error.service";
import { TitleService } from "../../../../shared/services/title.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  credentials = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router, public errorService: ErrorService, private titleService: TitleService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.route.snapshot.data["title"]);
  }

  login() {
    if (this.credentials.valid) {
      this.authService.authenticate({
        username: this.credentials.value.username,
        password: this.credentials.value.password
      }, () => {
        this.router.navigateByUrl('app/home');
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
