import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameDataService } from '../create-game/game.data-service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.css'],
  providers: [GameDataService,ToastrService]
})
export class ListGameComponent implements OnInit {
  public gameId: string = '';
  public local: string = '';
  public data: string = '';
  public horario: string = '';
  goleiros: any[] = [];
  zagueiros: any[] = [];
  laterais: any[] = [];
  meias: any[] = [];
  atacantes: any[] = [];

  public atletaForm: FormGroup;
  public controls: any;

 public posicoes = [
   {value: "Selecione sua posição"},
   {value: "Goleiro"},
   {value: "Zagueiro"},
   {value: "Lateral"},
   {value: "Meia"},
   {value: "Atacante"},
 ];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private gameDataService: GameDataService
  ) {
    this.atletaForm = this._formBuilder.group({
      nome: [''],
      posicao: [''],
      
    });

    this.controls = {
      nome: this.atletaForm.get('nome'),
      posicao: this.atletaForm.get('posicao'),
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.gameId = (params['id']));
    this.gameDataService.getGameById(this.gameId).then(response => {
      this.atualizarGrid(response.val())
    })
    this.getGoleiros(this.gameId,"Goleiros");
    this.getZagueiros(this.gameId,"Zagueiros");
    this.getLaterais(this.gameId,"Laterais");
    this.getMeias(this.gameId,"Meias");
    this.getAtacantes(this.gameId,"Atacantes");
   
    this.atletaForm.controls.posicao.setValue("Selecione sua posição");
  }

  atualizarGrid(data:any){
    this.local = data.local;
    this.horario = data.horario;
    this.data = data.data;
    
  }

  async handleAddAtleta(){
    let nome = this.controls.nome.value;
    let posicao = this.controls.posicao.value ;
    if(posicao != "Selecione sua posição"){
      if(posicao != "Lateral")
    {
      posicao = this.controls.posicao.value + 's'
    }else{
      posicao = "Laterais"
    }
    }
    
   if(nome.trim()!= "" && posicao.trim()!= "" && posicao != "Selecione sua posição"){
      await this.gameDataService.createAtletaByPos(this.gameId,posicao,nome).then( response => {
        return this.handleChangeDataGrid(posicao);
      });
    }else {
      this.toastr.error("Informe corretamente os campos.")
    }
  }
  closeModal(){
    let button = document.getElementById('buttonFake');
    button?.click();
    this.atletaForm.controls.nome.setValue("");
    this.atletaForm.controls.posicao.setValue("Selecione sua posição");
  }

  getGoleiros(key:string,posicao:string){
    
    this.gameDataService.getAtletaByPos(key,posicao).then(response => {
      response.forEach((item) => {
      
        this.goleiros.push({
          id: item.key || null,
          nome: item.val() || null
        })
      });
    });
   
  }
  deleteGoleiros(id:string){
    this.gameDataService.deleteAtletaByPos(this.gameId,"Goleiros",id).then(response => {
      this.goleiros = [];
      this.getGoleiros(this.gameId,"Goleiros")
    });
    
  }

  getZagueiros(key:string,posicao:string){
    
    this.gameDataService.getAtletaByPos(key,posicao).then(response => {
      response.forEach((item) => {
      
        this.zagueiros.push({
          id: item.key || null,
          nome: item.val() || null
        })
      });
    });
  
  }
  deleteZagueiros(id:string){
    this.gameDataService.deleteAtletaByPos(this.gameId,"Zagueiros",id).then(response => {
      this.zagueiros = [];
      this.getZagueiros(this.gameId,"Zagueiros")
    });
    
  }

  getLaterais(key:string,posicao:string){
    
    this.gameDataService.getAtletaByPos(key,posicao).then(response => {
      response.forEach((item) => {
        this.laterais.push({
          id: item.key || null,
          nome: item.val() || null
        })
      });
    });
  }

  deleteLaterais(id:string){
    this.gameDataService.deleteAtletaByPos(this.gameId,"Laterais",id).then(response => {
      this.laterais = [];
      this.getLaterais(this.gameId,"Laterais")
    });
    
  }

  getMeias(key:string,posicao:string){
    
    this.gameDataService.getAtletaByPos(key,posicao).then(response => {
      response.forEach((item) => {
        this.meias.push({
          id: item.key || null,
          nome: item.val() || null
        })
      });
    });
  }
  deleteMeias(id:string){
    this.gameDataService.deleteAtletaByPos(this.gameId,"Meias",id).then(response => {
      this.meias = [];
      this.getMeias(this.gameId,"Meias")
    });
    
  }

  getAtacantes(key:string,posicao:string){
    
    this.gameDataService.getAtletaByPos(key,posicao).then(response => {
      response.forEach((item) => {
        this.atacantes.push({
          id: item.key || null,
          nome: item.val() || null
        })
      });
    });
  }

  deleteAtacantes(id:string){
    this.gameDataService.deleteAtletaByPos(this.gameId,"Atacantes",id).then(response => {
      this.atacantes = [];
      this.getAtacantes(this.gameId,"Atacantes")
    });
    
  }

  copyCode(){
    navigator.clipboard.writeText(this.gameId);
    this.toastr.info("Código copiado!");
  }
  returnForHome(){
    this.router.navigateByUrl('/');
  }

  handleChangeDataGrid(posicao: string){
    switch (posicao) {
      case "Goleiros":
        this.toastr.info("Atleta Adicionado!")
        this.closeModal();
        this.goleiros = [];
        this.getGoleiros(this.gameId,"Goleiros");
        break;
        case "Zagueiros":
          this.toastr.info("Atleta Adicionado!")
          this.closeModal();
          this.zagueiros = [];
          this.getZagueiros(this.gameId,"Zagueiros");
          break;
    
          case "Laterais":
            this.toastr.info("Atleta Adicionado!")
            this.closeModal();
            this.laterais = [];
            this.getLaterais(this.gameId,"Laterais");
           break;
    
        case "Meias":
          this.toastr.info("Atleta Adicionado!")
          this.closeModal();
          this.meias = [];
          this.getMeias(this.gameId,"Meias");
        break;
    
        case "Atacantes":
          this.toastr.info("Atleta Adicionado!")
          this.closeModal();
          this.atacantes = [];
          this.getAtacantes(this.gameId,"Atacantes");
        break;
    
      default:
        break;
    }
  }

}
