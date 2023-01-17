import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response-interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor( private readonly pokemonService: PokemonService,
    private readonly http : AxiosAdapter) {

  }
  
  //private readonly axios: AxiosInstance = axios;
  async executeSeed() {
    let pokemons: CreatePokemonDto[] = [];
    this.pokemonService.removeMany();
    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    data.results.forEach( ({name, url})=> {
      const segments = url.split('/');
      const no:number = +segments[segments.length - 2];
      const pokemon: CreatePokemonDto = { 
        name,
        no: no
      }
      pokemons.push(pokemon);
    })
    this.pokemonService.createMany(pokemons)
    return `Seed executed succesfully`;
  }
}
