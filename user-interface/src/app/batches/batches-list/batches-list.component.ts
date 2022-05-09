import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { tuiPure } from "@taiga-ui/cdk";
import {
  TuiNotification,
  TuiNotificationContentContext,
  TuiNotificationsService
} from "@taiga-ui/core";
import {
  filter,
  mergeMap,
  Observable,
  share,
  shareReplay,
  takeWhile,
  tap
} from "rxjs";
import { CsvParserService } from "src/app/shared/service/csv-parser.service";
import { BatchesStoreService } from "src/app/stores/batches-store.service";
import { BatchesService } from "../batches.service";
import { Row } from "../models/batch-api-pieces";

@Component({
  selector: "app-batches-list",
  templateUrl: "./batches-list.component.html",
  styleUrls: ["./batches-list.component.scss"]
})
export class BatchesListComponent implements OnInit, OnDestroy {
  private kill: boolean = false;

  readonly control: FormControl = new FormControl();
  public importPreview: Row[] = [];

  public previewHeadings: string[] = [];

  @ViewChild("csvErrorTemplate")
  csvErrorTemplate?: TemplateRef<TuiNotificationContentContext>;

  constructor(
    private httpClient: HttpClient,
    private batchesService: BatchesService,
    private csvService: CsvParserService,
    private batchesStore: BatchesStoreService,
    @Inject(TuiNotificationsService)
    private notificationsService: TuiNotificationsService
  ) {}

  @tuiPure
  private get requests$(): Observable<File | null> {
    return this.control.valueChanges.pipe(
      takeWhile(() => !this.kill),
      filter((r) => r != null || r != undefined),
      tap((r) => {
        console.log(r);
        let file: File = r as File;
        let myReader: FileReader = new FileReader();
        myReader.readAsText(file);
        myReader.onload = () => {
          console.log(myReader.result, "reader result");
          if (myReader.result !== undefined) {
            const parsed = this.csvService.parseToArrayFrom(
              myReader.result?.toString()
            );

            if (!parsed.valid) {
              this.handleInvalidRows();
            }
            this.batchesStore.setBatch(parsed.result);
            const PREVIEW_MAX = 5;
            const preview: Row[] = parsed.result.filter(
              (item: Row, index: number) => index + 1 <= PREVIEW_MAX
            );

            this.importPreview = [...preview];

            this.previewHeadings = this.generatePreviewHeadings();
          }
        };
      })
    );
  }

  private generatePreviewHeadings(): string[] {
    const sample: Row = { firstName: "", lastName: "", email: "" };
    return Object.keys(this.importPreview[0] ?? sample);
  }

  private handleInvalidRows() {
    this.notificationsService
      .show(this.csvErrorTemplate || "", {
        label: "A template sample",
        status: TuiNotification.Error,
        autoClose: true
      })
      .subscribe({
        complete: () => {
          console.log("Notification is closed");
        }
      });
  }

  public clearBatchState(): void {
    const clear: Row[] = [];
    this.importPreview = clear;
    this.batchesStore.setBatch(clear);
  }

  ngOnInit(): void {
    this.requests$.subscribe();
  }

  ngOnDestroy(): void {
    this.kill = true;
  }
}
