import { Component, OnInit } from "@angular/core";
import { ConfigurationsService } from "./stores/configurations.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private readonly appConfigs: ConfigurationsService) {}

  ngOnInit(): void {
    this.appConfigs.getConfigurations()
      .subscribe((x) => console.log(x));
  }
}
