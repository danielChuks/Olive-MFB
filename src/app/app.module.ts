import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from './auth/logIn/login-service.service';
import { RegisterDeviceService } from './auth/Signup/register-device.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './guards/auth.service';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { GeneralServiceService } from './general-service.service';
import { Idle, IdleExpiry, SimpleExpiry } from '@ng-idle/core';
import { Network } from '@ionic-native/network/ngx';
import { AuthInterceptor } from './auth.interceptor';
import { FormatInputDirective } from './format-input.directive';

@NgModule({
  declarations: [AppComponent, FormatInputDirective],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  // eslint-disable-next-line max-len
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PDFGenerator,
    Idle,
    { provide: IdleExpiry, useClass: SimpleExpiry },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LoginServiceService,
    RegisterDeviceService,
    AuthService,
    AuthGuard,
    GeneralServiceService,
    NativeStorage,
    Network,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
