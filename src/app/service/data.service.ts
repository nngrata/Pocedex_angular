import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }
  // tslint:disable-next-line:variable-name
  // tslint:disable-next-line:variable-name
  // GET POKEMONS
  // tslint:disable-next-line:typedef
  getP(offset: number, limit: number){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  }
  // tslint:disable-next-line:typedef
  getMore(name: string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
