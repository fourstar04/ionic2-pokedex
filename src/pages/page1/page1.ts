import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PokemonService } from './../../app/app.service';
import { Pokemon } from './../../app/pokemon';
import { Content } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import { Page3 } from './../page3/page3';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [PokemonService]
})
export class Page1 {
  @ViewChild(Content) content: Content;
  pokemon: Pokemon[];
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pokemonService: PokemonService) {}

  offset:number = this.navParams.get('offset') || 0;
  limit:number = 10;

  ngOnInit() { this.getPokemon() }

  getPokemon() {
  	this.pokemon = [];
	  this.pokemonService.getPokemon(this.offset)
	                   .subscribe(
	                     pokemon => this.pokemon = pokemon,
	                     error =>  this.errorMessage = <any>error
	                   );
  }

  next() {
  	  this.offset += this.limit;
  	  this.getPokemon()
  	  this.content.scrollToTop();
  }

  prev() {
  	  this.offset -= this.limit;
  	  this.getPokemon()
  	  this.content.scrollToTop();
  }

  pushDetails(poke: Pokemon) {
  	  this.navCtrl.push(Page3, {name: poke.name})
  }
}
