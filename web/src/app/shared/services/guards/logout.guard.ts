import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginGuard } from "./login.guard";

@Injectable({
	providedIn: "root",
})
export class LogoutGuard implements CanActivate {
	constructor(private loginGuard: LoginGuard) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): boolean {
		return !this.loginGuard.canActivate(route, state);
	}
}
