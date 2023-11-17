import { Component, OnInit } from "@angular/core";
import { Project } from "../../../../features/project/models/project.model";
import { ProjectResourceService } from "../../../../features/project/services/project-resource.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-header-menu-items",
	templateUrl: "./header-menu-items.component.html",
	styleUrls: ["./header-menu-items.component.css"],
})
export class HeaderMenuItemsComponent implements OnInit {
	menuItemsPre = [
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
	];
	menuItemsProjects: Array<{
		icon: string;
		text: string;
		isDivider: boolean;
		projectId: number;
	}> = [];
	menuItemsAfter = [
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
	private projects: Project[] = [];

	constructor(
		private projectResourceService: ProjectResourceService,
		private router: Router,
	) {}

	ngOnInit() {
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
						projectId: project.getId(),
					},
				];
			}
		});
	}

	goToProjectTasks(projectId: any) {
		this.router.navigate(["app/projects/" + projectId + "/tasks"]);
	}
}
