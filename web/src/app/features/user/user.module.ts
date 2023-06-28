import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [CommonModule, BrowserModule, FormsModule, RouterModule],
})
export class UserModule { }
