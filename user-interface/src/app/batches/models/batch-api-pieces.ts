import { Configuration } from "src/app/stores/models/configuration";

export interface IBatchApiPieces {
  restDbUrl: Configuration;
  apiKey: Configuration;
}

export interface Row {
  firstName: string;
  lastName: string;
  email: string;
}

export interface CsvParseResult {
  valid: boolean;
  result: Row[]
}
