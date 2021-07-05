import { Component } from '@angular/core';
import { Game } from './models/game';
import { GameDataService } from './pages/game/create-game/game.data-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GameDataService]
})
export class AppComponent {
  title = 'CanetaAzulWebSite';

  constructor(private gameDataService: GameDataService,private router: Router) {}

  ngOnInit(): void {
   // this.gameDataService.createAtletaByPos("-MdrkByJ8G-tvRpf3H_q","atacantes","Teste");
  
  }

 

}
