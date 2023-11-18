import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../../core/services/auth/auth.service";
import { TitleService } from "../../services/title.service";
import { Subscription } from "rxjs";
import { MatDrawer } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnDestroy, OnInit {
	@ViewChild(MatDrawer, { static: true })
	drawer!: MatDrawer;
	public title = "";
	private subscription: Subscription;

	constructor(
		private auth: AuthService,
		private titleService: TitleService,
		private observer: BreakpointObserver,
	) {
		this.subscription = this.titleService.title$.subscribe((title) => {
			this.title = title;
		});
	}

	ngOnInit() {
		this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
			if (res.matches) {
				this.drawer.mode = "push";
				this.drawer.close();
			} else {
				this.drawer.mode = "side";
				this.drawer.open();
			}
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	logout() {
		this.auth.logout();
	}
}
