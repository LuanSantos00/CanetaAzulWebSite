import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameDataService } from '../../game/create-game/game.data-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GameDataService]
})
export class HomeComponent implements OnInit {

  public codigoSalaForm: FormGroup;
  public controls: any;
  
  constructor(private router: Router, 
              private gameDataService: GameDataService,
              private formBuilder: FormBuilder) { 

                this.codigoSalaForm = this.formBuilder.group({
                  roomCode: ['',Validators.required]
                });

                this.controls = {
                  roomCode : this.codigoSalaForm.get('roomCode')
                }
              }

  ngOnInit(): void {
  }
  novoJogo(){
    this.router.navigateByUrl('/teste');
  }
  
  handleRoomCode(controls:any){
      let keyRoom = controls.roomCode.value;
      if(keyRoom.trim() != ""){
        this.gameDataService.getGameById(keyRoom).then(response => {
          if(response.exists()){
            this.router.navigate(['/listarJogo', keyRoom]);
          }else{
            alert("Código Inválido");
          }
        })
      }else{
        alert("Informe o código");
      }
  }

}
