import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { WhoamiComponent } from './shared/components/whoami/whoami.component';
import { CvComponent } from './profil/cv/cv.component';
import { ListeAmisComponent } from './profil/liste-amis/liste-amis.component';
import { PortailComponent } from './portail/portail.component';
import { ConnexionComponent } from './portail/connexion/connexion.component';
import { InscriptionComponent } from './portail/inscription/inscription.component';
import { FormationsComponent } from './profil/cv/formations/formations.component';
import { CompetencesComponent } from './profil/cv/competences/competences.component';
import { HobbiesComponent } from './profil/cv/hobbies/hobbies.component';
import { PresentationComponent } from './profil/cv/presentation/presentation.component';

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
    WhoamiComponent,
    CvComponent,
    ListeAmisComponent,
    PortailComponent,
    ConnexionComponent,
    InscriptionComponent,
    FormationsComponent,
    CompetencesComponent,
    HobbiesComponent,
    PresentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
