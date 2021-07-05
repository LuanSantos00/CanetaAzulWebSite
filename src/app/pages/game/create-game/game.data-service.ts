import { Injectable } from "@angular/core";
import { Game } from '../../../models/game';
import { AngularFireDatabase,AngularFireList  } from "@angular/fire/database";
import { map } from 'rxjs/operators';
import { async, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GameDataService {
     gamesRef: AngularFireList<Game>;

    constructor(private db: AngularFireDatabase){
        this.gamesRef = db.list('/games');
    }

    insert(game: Game){
        this.db.list('games').push(game)
        .then((result: any ) => {
            console.log(result);
        })
    }

    update(game: Game, key:string){
        this.db.list('games').update(key,game)
        .catch((error: any) => {
            console.log(error);
        })
    }

    getAll(): AngularFireList<Game> {
        return this.gamesRef;
    }

    async getGameById(id: string)  {
        return await this.db.database.ref(`/games/${id}`).get()
          
    }
    async createAtletaByPos(key:string,posicao:string,nome:string){
        await this.db.list(`games/${key}/atletas/${posicao}`).push(nome)
        .then((result: any ) => {
            console.log(result);
        });
    }

    async getAtletaByPos(key:string,posicao:string,){
        return await this.db.database.ref(`/games/${key}/atletas/${posicao}`).get()

    }

}