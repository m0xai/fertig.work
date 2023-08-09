import { Injectable } from '@angular/core';
import { ResourceService } from "../../../shared/resource.service";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService<User> {
  constructor(private http: HttpClient) {
    super(http, User, "users/")
  }
}
