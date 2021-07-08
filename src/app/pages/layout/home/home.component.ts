import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameDataService } from '../../game/create-game/game.data-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GameDataService, ToastrService]
})
export class HomeComponent implements OnInit {

  public codigoSalaForm: FormGroup;
  public controls: any;
  
  constructor(private router: Router, 
              private toastr: ToastrService,
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
    this.router.navigateByUrl('/novoJogo');
  }
  
  handleRoomCode(controls:any){
      let keyRoom = controls.roomCode.value;
      if(keyRoom.trim() != ""){
        this.gameDataService.getGameById(keyRoom).then(response => {
          if(response.exists()){
            this.closeModal()
            this.router.navigate(['/listarJogo', keyRoom]);
          }else{
            this.toastr.error("Código Inválido");
          }
        })
      }else{
        this.toastr.error("Informe o código");
      }
  }

  closeModal(){
    let button = document.getElementById('buttonFake');
    button?.click();
  }

}
