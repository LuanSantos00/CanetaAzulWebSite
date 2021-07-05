import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameDataService } from '../create-game/game.data-service';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.css'],
  providers: [GameDataService]
})
export class ListGameComponent implements OnInit {
  public gameId: string = '';
  
  public local: string = '';
  public data: string = '';
  public horario: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameDataService: GameDataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.gameId = (params['id']));
    this.gameDataService.getGameById(this.gameId).then(response => {
      this.atualizarGrid(response.val())
    })
  }

  atualizarGrid(data:any){
    this.local = data.local;
    this.horario = data.horario;
    this.data = data.data;
  }

}
