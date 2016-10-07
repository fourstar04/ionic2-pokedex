import { PokemonService } from './app.service';

export class Pokemon {
  id: string;
  name: string;
  url: string;
  base_experience: string;
  errorMessage: string;

  constructor (private pokemonService: PokemonService) {}
}