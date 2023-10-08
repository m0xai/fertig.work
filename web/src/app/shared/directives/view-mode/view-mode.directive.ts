import { Directive, Renderer2, TemplateRef } from "@angular/core";

@Directive({
	selector: "[appViewMode]",
})
export class ViewModeDirective {
	constructor(
		public renderer: Renderer2,
		public tpl: TemplateRef<any>,
	) {}
}
