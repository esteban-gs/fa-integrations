import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { tuiPure } from "@taiga-ui/cdk";
import { TuiFileLike } from "@taiga-ui/kit";
import { Observable, of, timer } from "rxjs";
import { map, mapTo, share, startWith, switchMap, tap } from "rxjs/operators";
import { CsvParserService } from "../shared/service/csv-parser.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  constructor() {}

}
