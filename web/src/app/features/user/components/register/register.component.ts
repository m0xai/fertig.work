import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../../models/user";
import { AuthService } from "../../../../core/services/auth/auth.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerFormGroup: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  constructor(private authService: AuthService, private userService: UserService) {
  }

  submitRegisterForm() {
    if (this.registerFormGroup.valid) {
      this.authService.register(new User(this.registerFormGroup.value))
    }
  }

  // TODO: mvoe this into shared folder
  getErrorMessage(fieldName: string) {
    if (this.registerFormGroup.get(fieldName)?.hasError('required')) {
      return 'You must enter a value';
    }
    return "Please enter a valid " + fieldName;
  }
}
