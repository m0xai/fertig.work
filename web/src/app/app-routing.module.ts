import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './features/user/components/login/login.component';
import {HomeComponent} from './features/home/components/home/home.component';
import {LoginGuard} from "./shared/services/login.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', canActivate: [LoginGuard], component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
