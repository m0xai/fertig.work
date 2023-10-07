import { Component, ContentChild, ElementRef, EventEmitter, OnInit, Output } from "@angular/core";
import { filter, fromEvent, Subject, switchMapTo, take } from "rxjs";
import { ViewModeDirective } from "../../directives/view-mode/view-mode.directive";
import { EditModeDirective } from "../../directives/edit-mode/edit-mode.directive";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@Component({
	selector: "app-form-dialog-editable",
	template: ` <ng-container *ngTemplateOutlet="currentView"></ng-container> `,
})
@UntilDestroy({ checkProperties: true })
export class FormDialogEditableComponent implements OnInit {
	@Output() update = new EventEmitter();
	@ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective | any;
	@ContentChild(EditModeDirective) editModeTpl: EditModeDirective | any;
	editMode = new Subject();
	editMode$ = this.editMode.asObservable();

	mode: "view" | "edit" = "view";

	constructor(private host: ElementRef) {}

	get currentView() {
		return this.mode === "view" ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
	}

	private get element() {
		return this.host.nativeElement;
	}

	ngOnInit() {
		this.viewModeHandler();
		this.editModeHandler();
	}

	private viewModeHandler() {
		fromEvent(this.element, "dblclick")
			.pipe(untilDestroyed(this))
			.subscribe(() => {
				this.mode = "edit";
				this.editMode.next(true);
			});
	}

	private editModeHandler() {
		const clickOutside$ = fromEvent(document, "click").pipe(
			filter(({ target }) => this.element.contains(target) === false),
			take(1),
		);

		this.editMode$.pipe(switchMapTo(clickOutside$), untilDestroyed(this)).subscribe((event) => {
			this.update.next(undefined);
			this.mode = "view";
		});
	}
}
