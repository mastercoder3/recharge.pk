import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotificationComponent } from './shared/notification/notification.component';

import { Camera } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { ImageViewerComponent } from './shared/image-viewer/image-viewer.component';
import { AgentsComponent } from './agents/agents/agents.component';
import { AdminComponent } from './admin/admin/admin.component';

@NgModule({
  declarations: [AppComponent, NotificationComponent, ImageViewerComponent, AgentsComponent, AdminComponent],
  entryComponents: [NotificationComponent, ImageViewerComponent, AgentsComponent, AdminComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'paypak'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Clipboard,
    FirebaseX,
    ScreenOrientation,
    LocalNotifications,
    AndroidPermissions,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
