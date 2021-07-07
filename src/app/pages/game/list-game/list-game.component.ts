import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameDataService } from '../create-game/game.data-service';
import { ToastrService } from 'ngx-toastr';
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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private gameDataService: GameDataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.gameId = (params['id']));
    this.gameDataService.getGameById(this.gameId).then(response => {
      this.atualizarGrid(response.val())
    })
    this.getGoleiros(this.gameId,"goleiros");
    this.getZagueiros(this.gameId,"zagueiros");
    this.getLaterais(this.gameId,"laterais");
    this.getMeias(this.gameId,"meias");
    this.getAtacantes(this.gameId,"atacantes");
   //this.gameDataService.createAtletaByPos(this.gameId,"atacantes","Ayslan");
  }

  atualizarGrid(data:any){
    this.local = data.local;
    this.horario = data.horario;
    this.data = data.data;
    
  }
  getGoleiros(key:string,posicao:string){
    
    this.gameDataService.getAtletaByPos(key,posicao).then(response => {
      response.forEach((item) => {
      //  console.log(item.val())
        this.goleiros.push({
          id: item.key || null,
          nome: item.val() || null
        })
      });
    });
   // console.log(this.goleiros);
  }
  deleteGoleiros(id:string){
    this.gameDataService.deleteAtletaByPos(this.gameId,"goleiros",id).then(response => {
      this.goleiros = [];
      this.getGoleiros(this.gameId,"goleiros")
    });
    //this.gameDataService.deleteTeste(this.gameId,"goleiros",id)
  }

  getZagueiros(key:string,posicao:string){
    
    this.gameDataService.getAtletaByPos(key,posicao).then(response => {
      response.forEach((item) => {
      //  console.log(item.val())
        this.zagueiros.push({
          id: item.key || null,
          nome: item.val() || null
        })
      });
    });
   // console.log(this.goleiros);
  }
  deleteZagueiros(id:string){
    this.gameDataService.deleteAtletaByPos(this.gameId,"zagueiros",id).then(response => {
      this.zagueiros = [];
      this.getZagueiros(this.gameId,"zagueiros")
    });
    //this.gameDataService.deleteTeste(this.gameId,"goleiros",id)
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
    this.gameDataService.deleteAtletaByPos(this.gameId,"laterais",id).then(response => {
      this.laterais = [];
      this.getLaterais(this.gameId,"laterais")
    });
    //this.gameDataService.deleteTeste(this.gameId,"goleiros",id)
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
    this.gameDataService.deleteAtletaByPos(this.gameId,"meias",id).then(response => {
      this.meias = [];
      this.getMeias(this.gameId,"meias")
    });
    //this.gameDataService.deleteTeste(this.gameId,"goleiros",id)
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
    this.gameDataService.deleteAtletaByPos(this.gameId,"atacantes",id).then(response => {
      this.atacantes = [];
      this.getAtacantes(this.gameId,"atacantes")
    });
    //this.gameDataService.deleteTeste(this.gameId,"goleiros",id)
  }

  copyCode(){
    navigator.clipboard.writeText(this.gameId);
    this.toastr.info("Código copiado!");
  }
  returnForHome(){
    this.router.navigateByUrl('/');
  }

}
