import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PokemonService } from './../../app/app.service';
import { Pokemon } from './../../app/pokemon';
import { Content } from 'ionic-angular';

@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html',
  providers: [PokemonService]
})
export class Page3 {
  @ViewChild(Content) content: Content;
  pokemon: Pokemon;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pokemonService: PokemonService) {}

  name:string = this.navParams.get('name');

  ngOnInit() { this.getPokemon() }

  getPokemon() {
    this.pokemonService.getDetails(this.name)
                     .subscribe(
                       pokemon => {
                         this.pokemon = pokemon
                       },
                       error =>  this.errorMessage = <any>error
                     );
  }

  next() {
    this.pokemonService.getDetails(this.pokemon.id+1)
                     .subscribe(
                       pokemon => {
                         this.pokemon = pokemon
                         this.name = pokemon.name
                         this.content.scrollToTop();
                       },
                       error =>  this.errorMessage = <any>error
                     );
  }

  prev() {
  	this.pokemonService.getDetails(this.pokemon.id+-1)
                     .subscribe(
                       pokemon => {
                         this.pokemon = pokemon
                         this.name = pokemon.name
                         this.content.scrollToTop();
                       },
                       error =>  this.errorMessage = <any>error
                     );
  }
}
