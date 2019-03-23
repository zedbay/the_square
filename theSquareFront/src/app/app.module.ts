import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccueilComponent } from './accueil/accueil.component';
import { EmploisComponent } from './emplois/emplois.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { ProfilComponent } from './profil/profil.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ActualiteComponent } from './accueil/actualite/actualite.component';
import { SuggestionComponent } from './accueil/suggestion/suggestion.component';
import { WhoamiComponent } from './accueil/whoami/whoami.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccueilComponent,
    EmploisComponent,
    MessagerieComponent,
    ProfilComponent,
    PageNotFoundComponent,
    ActualiteComponent,
    SuggestionComponent,
    WhoamiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
