import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

import { Error404Component } from './error404/error404.component';
import { RewardsComponent } from './rewards/rewards.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectConfig } from '@ng-select/ng-select';
import { NgSelectModule } from '@ng-select/ng-select';
import { NominationReportsComponent } from './nomination-reports/nomination-reports.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    Error404Component,
    RewardsComponent,
    UserProfileComponent,
    NominationReportsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgSelectModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000, // 10 seconds
      closeButton: true,
      progressBar: true,
    }),
    AuthModule,
  ],
  exports: [ToastrModule],
  providers: [NgSelectConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
