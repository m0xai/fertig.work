import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../../core/services/auth/auth.service";
import { TitleService } from "../../services/title.service";
import { Subscription } from "rxjs";
import { MatDrawer } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { ProjectResourceService } from "../../../features/project/services/project-resource.service";
import { Project } from "../../../features/project/models/project.model";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnDestroy, OnInit {
	@ViewChild(MatDrawer, { static: true })
	drawer!: MatDrawer;
	public title = "";
	public menuItemsPre = [
		{
			icon: "dashboard",
			text: "Dashboard",
			isDivider: false,
			route: "home",
		},
		{
			icon: "token",
			text: "Projects",
			isDivider: false,
			route: "projects",
		},
		{
			icon: "inbox",
			text: "Inbox",
			isDivider: false,
			route: "home",
		},
		{
			icon: null,
			text: null,
			isDivider: true,
			class: "base-sidenav__menu__project-divider",
		},
	];
	private projects: Project[] = [];
	private menuItemsProjects: Array<{
		icon: string;
		text: string;
		isDivider: boolean;
		route: string;
	}> = [];
	private menuItemsAfter = [
		{
			icon: null,
			text: null,
			isDivider: true,
			class: "base-sidenav__menu__user-divider",
		},
		{
			icon: "person",
			text: "Profile",
			isDivider: false,
			route: "home",
		},
		{
			icon: "logout",
			text: "Logout",
			isDivider: false,
			route: "home",
		},
	];
	private subscription: Subscription;

	constructor(
		private auth: AuthService,
		private titleService: TitleService,
		private observer: BreakpointObserver,
		private projectResourceService: ProjectResourceService,
	) {
		this.subscription = this.titleService.title$.subscribe((title) => {
			this.title = title;
		});
	}

	ngOnInit() {
		this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
			if (res.matches) {
				this.drawer.mode = "over";
				this.drawer.close();
			} else {
				this.drawer.mode = "side";
				this.drawer.open();
			}
		});
		this.projectResourceService.fetch().subscribe({
			next: (response) => {
				this.projects = response;
				this.createMenuItemsOfProjects();
			},
		});
	}

	createMenuItemsOfProjects() {
		this.projects.forEach((project) => {
			if (project.title) {
				this.menuItemsProjects = [
					...this.menuItemsProjects,
					{
						icon: "book",
						text: project.title,
						isDivider: false,
						route: "projects/" + project.getId() + "/tasks/",
					},
				];
			}
		});
	}

	mergeMenuItems(): Array<{
		icon: string | null;
		text: string | null;
		isDivider: boolean;
		route?: string | null;
		class?: string | null;
	}> {
		return [...this.menuItemsPre, ...this.menuItemsProjects, ...this.menuItemsAfter];
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	logout() {
		this.auth.logout();
	}
}
