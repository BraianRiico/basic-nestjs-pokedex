import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { async } from 'rxjs';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interface/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); //delete * from pokemons
    
    const { data } = await this.axios.get<PokeResponse> ('https://pokeapi.co/api/v2/pokemon?limit=10')

    const insertPromisesArray = [];

    data.results.forEach(async({ name, url }) => {
      
      const  segments = url.split('/');
      const no = +segments[ segments.length - 2];

      // const pokemon = await this.pokemonModel.create({ name,no });
      insertPromisesArray.push(this.pokemonModel.create({ name,no }));
      
    })
    return 'Seed Executed';
  }
}
