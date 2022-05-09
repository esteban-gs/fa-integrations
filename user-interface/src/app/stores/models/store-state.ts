import { Row } from "src/app/batches/models/batch-api-pieces";
import { Configuration } from "./configuration";

export interface StoreState {
    configs: Configuration[];
    clientKey: string;
    batch: Row[];
}
