import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { getArraysFromCsvParts, getCsvParts, toCamelCase } from "src/app/tools";
import { Observable } from "rxjs";
import { CsvParseResult, Row } from "src/app/batches/models/batch-api-pieces";

@Injectable({
  providedIn: "root"
})
export class CsvParserService {
  constructor(private httpClient: HttpClient) {}

  public parseToArrayFrom(fileText: string | undefined): CsvParseResult {
    if (fileText === undefined) {
      return { valid: false, result: [] };
    }
    const { headingsRow, fileValueRows } = getCsvParts(fileText);
    if (!this.validateHeadings(headingsRow)) {
      console.log("INVALID HEADINGS ROW");
      return { valid: false, result: [] };
    }
    const result = getArraysFromCsvParts(headingsRow, fileValueRows);
    return { valid: true, result: result };
  }

  private validateHeadings(row: string[]): boolean {
    const typedObject: Row = { firstName: "", lastName: "", email: "" };
    const keys = Object.keys(typedObject);
    let diffs = 0;
    for (let i = 0; i < row.length; i++) {
      if (toCamelCase(row[i]) !== toCamelCase(keys[i])) {
        diffs++;
      }
    }
    return diffs === 0;
  }
}
