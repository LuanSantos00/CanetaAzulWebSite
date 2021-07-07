import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Game } from 'src/app/models/game';
import { GameDataService } from './game.data-service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery'
import { async } from 'rxjs';
@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css'],
  providers:[GameDataService]
})
export class CreateGameComponent implements OnInit {

  public jogoForm: FormGroup;
  public controls: any;
  public keyResult: string = '';
   $: any;
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
<<<<<<< HEAD
       await this._gameDataService.insert(game)
      this.keyResult = this._gameDataService.keyResult;
      if(this.keyResult.trim() != "") { this.abreModal()}
        
=======
       this._gameDataService.insert(game)
      this.controls.codigo = this._gameDataService.keyResult;
      
      //$('#exampleModal').modal('show')

>>>>>>> fc88cea828b8f7eed588229b6467155f4f3b2909
    }
    else{
      this._toast.error("Preencha todos os campos!");
    }
  }

   abreModal() {
    let button = document.getElementById('buttonFake');
    button?.click();
  }
  
  

  
}
