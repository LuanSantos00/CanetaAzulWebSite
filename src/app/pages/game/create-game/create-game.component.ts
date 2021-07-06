import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Game } from 'src/app/models/game';
import { GameDataService } from './game.data-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css'],
  providers:[GameDataService]
})
export class CreateGameComponent implements OnInit {

  public jogoForm: FormGroup;
  public controls: any;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _gameDataService : GameDataService,
    private _toast : ToastrService,
  ) { 
    this.jogoForm = this._formBuilder.group({
      local: [''],
      data: [''],
      horario: [''],
    });

    this.controls = {
      local: this.jogoForm.get('local'),
      data: this.jogoForm.get('data'),
      horario: this.jogoForm.get('horario'),
    }
  }
  

  ngOnInit(): void {
    
  }


  returnHome(): void {
    this.router.navigateByUrl('/');
  }

  isValid(entry : Game): boolean{
    var result = false;

    if(entry.local != '' && entry.data != '' && entry.horario != ''){
      result = true;
    }

    return result;
  }

  newJogo(){
    let game: Game = new Game();

    game.local = this.controls.local.value;
    game.data = this.controls.data.value;
    game.horario = this.controls.horario.value;

    if(this.isValid(game)){
      this._gameDataService.insert(game);
    }
    else{
      this._toast.error("Preencha todos os campos!");
    }
  }
}
