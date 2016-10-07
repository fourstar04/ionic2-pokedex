import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Pokemon }     from './pokemon';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PokemonService {
  private pokeUrl = 'http://pokeapi.co/api/v2/pokemon/'
  
  constructor (private http: Http) {}
  
  getPokemon (offset?:number): Observable<Pokemon[]> {
    let url: string = offset ? this.pokeUrl+'?limit=10&offset='+offset : this.pokeUrl+'?limit=10';
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  
  getDetails (name:string): Observable<Pokemon> {
    let url: string = this.pokeUrl+name
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  
  private extractData(res: Response) {
    let body = res.json();
    return body.results || body || [];
  }
  
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}