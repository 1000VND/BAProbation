import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom, NgModule, provideZoneChangeDetection } from "@angular/core";
import { NgSelectModule } from '@ng-select/ng-select';
import { DxChartModule, DxPieChartModule } from "devextreme-angular";
import { BarComponent } from "./component/common/chart/bar/bar.component";
import { BrowserModule } from "@angular/platform-browser";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { MultiSelectComponent } from "./component/common/multi-select/multi-select.component";
import { CardComponent } from "./component/common/chart/card/card.component";
import { DoughnutComponent } from "./component/common/chart/doughnut/doughnut.component";
import { VehicleAtFactoryComponent } from "./component/dashboard/vehicle-at-factory/vehicle-at-factory.component";
import { VehicleAtPortComponent } from "./component/dashboard/vehicle-at-port/vehicle-at-port.component";
import { OverviewCompanyComponent } from "./component/dashboard/overview-company/overview-company.component";
import { VehicleAtBorderComponent } from "./component/dashboard/vehicle-at-border/vehicle-at-border.component";
import { VehicleAtRoadComponent } from "./component/dashboard/vehicle-at-road/vehicle-at-road.component";
import { WidgetComponent } from "./component/common/widget/widget.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { provideRouter, RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { HomeComponent } from "./component/login/home/home.component";
import { FooterComponent } from "./component/login/footer/footer.component";
import { HeaderComponent } from "./component/login/header/header.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { provideToastr, ToastrModule } from "ngx-toastr";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpLoaderFactory } from "./app.config";
import { TreeModule } from 'primeng/tree';
import { providePrimeNG } from "primeng/config";
import Aura from '@primeng/themes/aura';
import { MediaPhotoComponent } from "./component/media-photo/media-photo.component";
import { TreeSelectModule } from 'primeng/treeselect';
import { SelectModule } from 'primeng/select';

@NgModule({
    declarations: [
        MultiSelectComponent,
        WidgetComponent,
        BarComponent,
        CardComponent,
        DoughnutComponent,
        VehicleAtFactoryComponent,
        VehicleAtPortComponent,
        OverviewCompanyComponent,
        VehicleAtBorderComponent,
        VehicleAtRoadComponent,
        DashboardComponent,
        FooterComponent,
        HeaderComponent,
        HomeComponent,
        MediaPhotoComponent,
        AppComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        DxPieChartModule,
        DxChartModule,
        TreeModule,
        TreeSelectModule,
        SelectModule,
        TranslateModule.forRoot(),
        RouterModule.forRoot(routes),
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        DxPieChartModule,
        DxChartModule,
        RouterModule,
        TranslateModule,
        ToastrModule,
        TreeModule,
        SelectModule,
        MultiSelectComponent,
    ],
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideToastr({
            positionClass: 'toast-bottom-right',
            timeOut: 5000,
            preventDuplicates: true,
            closeButton: true,
            progressBar: true,
            enableHtml: true
        }),
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }),
        ),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: false
                }
            }
        })
    ],
    bootstrap: [AppComponent],
})
export class AppBaseModule { }
