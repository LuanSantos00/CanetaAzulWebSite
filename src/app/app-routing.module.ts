import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGameComponent } from './pages/game/create-game/create-game.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { HomeComponent } from './pages/layout/home/home.component';
const routes: Routes = [
  { path: '', component: HomeComponent},  
  { path: 'novoJogo', component: CreateGameComponent},
  { path: 'teste', component: HeaderComponent},
 
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }