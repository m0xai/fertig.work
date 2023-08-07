import { Component, OnDestroy } from '@angular/core';
import { AuthService } from "../../../core/services/auth/auth.service";
import { TitleService } from "../../services/title.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  public title = "";
  public menuItems = [
    {
      icon: "dashboard",
      text: "Dashboard",
      isDivider: false,
      route: "home"
    },
    {
      icon: "token",
      text: "Projects",
      isDivider: false,
      route: "home"
    },
    {
      icon: "inbox",
      text: "Inbox",
      isDivider: false,
      route: "home"
    },
    {
      icon: null,
      text: null,
      isDivider: true,
      class: "base-sidenav__menu__project-divider"
    },

    {
      icon: "book",
      text: "Project A",
      isDivider: false,
      route: "tasks"
    },
    {
      icon: "book",
      text: "Another Project",
      isDivider: false,
      route: "home"
    },
    {
      icon: null,
      text: null,
      isDivider: true,
      class: "base-sidenav__menu__user-divider"
    },
    {
      icon: "person",
      text: "Profile",
      isDivider: false,
      route: "home"
    },
    {
      icon: "logout",
      text: "Logout",
      isDivider: false,
      route: "home"
    },
  ]
  private subscription: Subscription;

  constructor(private auth: AuthService, private titleService: TitleService) {
    this.subscription = this.titleService.title$.subscribe((title) => {
      this.title = title;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }

}
