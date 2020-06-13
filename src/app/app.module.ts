import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { FullComponent } from './layouts/full/full.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { EndpointFactory } from './services/endpoint-factory.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { ConvertAmountPipe } from './pipe/convert-amount.pipe';
import { BlockUIModule } from 'ng-block-ui';
import { SignupComponent } from './login/signup/signup.component';
import { LoginComponent } from './login/login.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true
};

@NgModule({
    declarations: [
        AppComponent,
        FullComponent,
        NavigationComponent,
        BreadcrumbComponent,
        SidebarComponent,
        SignupComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        RouterModule.forRoot(Approutes),
        BlockUIModule.forRoot(),
        PerfectScrollbarModule,
        ChartsModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        EndpointFactory,
        LocalStoreManager
    ],
    bootstrap: [AppComponent],
    exports: [
        SignupComponent,
        LoginComponent
    ],
    entryComponents: [
        SignupComponent,
        LoginComponent
    ]
})
export class AppModule { }
