import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectResourceService } from "../services/project-resource.service";
import { Project } from "../models/project.model";
import { UserService } from "../../user/services/user.service";
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from "rxjs";
import { User } from "../../user/models/user";
import { CollaboratorResourceService } from "../services/collaborator-resource.service";
import { Collaborator } from "../models/collaborator.model";

@Component({
	selector: "app-project-create",
	templateUrl: "./project-create.component.html",
	styleUrls: ["./project-create.component.css"],
})
export class ProjectCreateComponent implements AfterViewInit {
	@ViewChild("collaboratorSearch") collaboratorSearch: ElementRef | undefined;
	// TODO: Set FormGroup generic type properly
	firstFormGroup: FormGroup<any> = this._formBuilder.group({
		title: ["", Validators.required],
		description: "",
		color: ["", Validators.required],
		startOn: [new Date(), Validators.required],
	});
	secondFormGroup = this._formBuilder.group({
		secondCtrl: [],
	});
	isLinear = false;
	public foundUsers: User[] = [];
	public selectedUsers: User[] = [];

	constructor(
		private _formBuilder: FormBuilder,
		private projectResourceService: ProjectResourceService,
		private collaboratorResourceService: CollaboratorResourceService,
		private userService: UserService,
	) {}

	submitCreateProjectForm() {
		if (this.firstFormGroup.valid) {
			this.projectResourceService.create(new Project(this.firstFormGroup.value)).subscribe({
				// TODO: redirect users to project page after creation of project
				next: (resp) => {
					console.log("Sent", resp);
					// TODO: Send POST request to collaborators
					const collaborators: Collaborator[] | undefined = [];
					this.selectedUsers.forEach((v) => {
						collaborators.push(
							this.collaboratorResourceService.createCollaborator(v, resp),
						);
					});
					this.collaboratorResourceService.createBulk(collaborators).subscribe({});
				},
				error: (err) => console.error(err),
			});
		}
	}

	ngAfterViewInit(): void {
		fromEvent(this.collaboratorSearch?.nativeElement, "keyup")
			.pipe(
				filter(Boolean),
				debounceTime(200),
				distinctUntilChanged(),
				tap(() => {
					this.userService
						.search(this.collaboratorSearch?.nativeElement.value)
						.subscribe((resp: any) => {
							this.foundUsers = this.excludeAlreadySelectedUsers(resp);
						});
				}),
			)
			.subscribe();
	}

	excludeAlreadySelectedUsers(resp: User[]) {
		return resp.filter((item: User) => !this.selectedUsers.find((v) => v.id === item.id));
	}

	selectFoundUser(user: User) {
		if (!this.selectedUsers.includes(user)) {
			this.selectedUsers = [user, ...this.selectedUsers];
			this.secondFormGroup.controls.secondCtrl.reset();
		}
	}

	showFoundUsers(user: User): string {
		return user && user.username ? `${user.username} - ${user.email}` : "";
	}

	removeSelectedUser(user: User) {
		this.selectedUsers = this.selectedUsers.filter((v: User) => v.id !== user.id);
	}
}
