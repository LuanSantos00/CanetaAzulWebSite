import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { CreateGameComponent } from './pages/game/create-game/create-game.component';
import { NavigationComponent } from './pages/layout/navigation/navigation.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { HomeComponent } from './pages/layout/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateGameComponent,
    NavigationComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
