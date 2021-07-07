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
  providers:[GameDataService,ToastrService]
})
export class CreateGameComponent implements OnInit {

  public jogoForm: FormGroup;
  public controls: any;
  public keyResult: string = '';
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _gameDataService : GameDataService,
  ) { 
    this.jogoForm = this._formBuilder.group({
      local: [''],
      data: [''],
      horario: [''],
      codigo: ['']
    });

    this.controls = {
      local: this.jogoForm.get('local'),
      data: this.jogoForm.get('data'),
      horario: this.jogoForm.get('horario'),
      codigo : this.jogoForm.get('codigo'),
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

  async newJogo() {
    let game: Game = new Game();

    game.local = this.controls.local.value;
    game.data = this.controls.data.value;
    game.horario = this.controls.horario.value;

    if(this.isValid(game)){
      await this._gameDataService.insert(game)
      this.keyResult = this._gameDataService.keyResult;
      if(this.keyResult.trim() != "") { this.abreModal()}
      
    }
    else{
      this.toastr.error("Preencha todos os campos!");

    }
  }

   abreModal() {
    let button = document.getElementById('buttonFake');
    button?.click();
  }
  
  

  
}
