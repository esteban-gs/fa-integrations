import { IEnvironment } from "src/app/models/Environment";

export const environment: IEnvironment = {
  production: true,
  apiUrl: window.location.protocol + "//" + window.location.host + "/api",
};
