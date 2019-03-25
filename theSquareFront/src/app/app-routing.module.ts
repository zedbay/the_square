import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { EmploisComponent } from './emplois/emplois.component';
import { ProfilComponent } from './profil/profil.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PortailComponent } from './portail/portail.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'portail', component: PortailComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'emplois', component: EmploisComponent },
  { path: 'messagerie', component: MessagerieComponent },
  { path: '', component: AccueilComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
