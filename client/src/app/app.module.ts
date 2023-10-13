//environments
import { environment } from '../environments/environment.development';

//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth0/auth0-angular';

//Component
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/layout/navbar/navbar.component';

//Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage'


//Service
import { UserAPIService } from './core/services/api/userAPI.service';
import { TaskAPIService } from './core/services/api/taskAPI.service';
import { BoardAPIService } from './core/services/api/boardAPI.service';
import { UserService } from './core/services/user.service';
import { TaskService } from './core/services/task.service';

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
      domain: environment.auth0_domain,
      clientId: environment.auth0_clientId,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    provideFirebaseApp(() => initializeApp({
      apiKey: environment.apiKey,
      authDomain: environment.authDomain,
      projectId: environment.projectId,
      storageBucket: environment.storageBucket,
      messagingSenderId: environment.messagingSenderId,
      appId: environment.appId,
      measurementId: environment.measurementId
    })),
    provideStorage(() => getStorage()),
  ],
  providers: [
    UserAPIService, 
    TaskAPIService,
    BoardAPIService,
    UserService, 
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
