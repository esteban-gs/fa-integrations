import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core";

interface IMenuArea {
  label: string;
  menu: IMenu[];
}

interface IMenu {
  link: string;
  icon: string;
  label: string;
}

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
  open = false;

  readonly menus: IMenuArea[] = [
    {
      label: "General",
      menu: [
        { link: "home", icon: "tuiIconArrowUpRight", label: "Home" },
        { link: "batches", icon: "tuiIconArrowUpRight", label: "Batches" },
        { link: "client-auth", icon: "tuiIconArrowUpRight", label: "Authenticate"}
      ]
    }
  ];

  toggle(open: boolean) {
    this.open = open;
  }
}
