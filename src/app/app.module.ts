import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, HttpRequestInterceptor } from '@core/interceptors';
import localeEnDe from '@angular/common/locales/en-DE';
import localeEnDeExtra from '@angular/common/locales/extra/en-DE';
import { registerLocaleData } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

// import { SaveDom2Pipe } from './save-dom2.pipe';


registerLocaleData(localeEnDe, localeEnDeExtra);

@NgModule({
  declarations: [
    AppComponent,
    // SaveDom2Pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MatTabsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: LOCALE_ID, useValue: 'en-DE' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
