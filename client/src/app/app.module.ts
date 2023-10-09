import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { AuthModule } from '@auth0/auth0-angular';
import { UserService } from './core/services/user.service';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NavbarComponent,
    AuthModule.forRoot({
      domain: 'dev-odtnb8tlsws7figa.us.auth0.com',
      clientId: 'tZnvGlEddO2BTV6ZRfhcJknBAQwo3Ua5',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyD_q9UtBw5cP2FeeN7qx834j1KqEbFT_VU",
      authDomain: "schedule-task-b1b2b.firebaseapp.com",
      projectId: "schedule-task-b1b2b",
      storageBucket: "schedule-task-b1b2b.appspot.com",
      messagingSenderId: "485999051787",
      appId: "1:485999051787:web:e732c333be55352759f30e",
      measurementId: "G-LLTWEXT9YT"
    })),
    provideStorage(() => getStorage()),
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
