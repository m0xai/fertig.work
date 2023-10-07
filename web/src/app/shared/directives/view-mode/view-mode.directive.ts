import { Directive, OnInit, Renderer2, TemplateRef } from "@angular/core";

@Directive({
	selector: "[appViewMode]",
})
export class ViewModeDirective implements OnInit {
	constructor(
		public renderer: Renderer2,
		public tpl: TemplateRef<any>,
	) {}

	ngOnInit(): void {
		// this.renderer.addClass(this.tpl, "kerem");
	}
}
