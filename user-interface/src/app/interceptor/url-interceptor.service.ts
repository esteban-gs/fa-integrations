import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class UrlInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let requestUrl = req.url;
    const usableUrlPart = requestUrl.split("@api-x");

    if (requestUrl.indexOf("@api-x") !== -1) {
      requestUrl = environment.apiUrl + usableUrlPart[1];
      console.log(requestUrl);
    }
    req = req.clone({
      url: environment.apiUrl + usableUrlPart[1]
    });
    console.log(req.url);
    return next.handle(req);
  }
}
