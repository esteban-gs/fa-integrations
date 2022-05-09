import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

import {
  TuiRootModule,
  TuiDialogModule,
  TuiNotificationsModule,
  TuiSvgModule,
  TuiButtonModule,
  TuiLinkModule
} from "@taiga-ui/core";
import { NavComponent } from "./nav/nav.component";
import { TuiSidebarModule } from "@taiga-ui/addon-mobile";
import { TuiActiveZoneModule } from "@taiga-ui/cdk";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { APP_BASE_HREF } from "@angular/common";
import { UrlInterceptor } from "./interceptor/url-interceptor.service";

@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TuiSvgModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiButtonModule,
    TuiLinkModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/app" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
