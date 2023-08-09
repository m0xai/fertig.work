import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TitleService } from "../../../../shared/services/title.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.route.snapshot.data["title"])
  }

}
