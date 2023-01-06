import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private defaulLimit: number;
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ){
    this.defaulLimit =  configService.get<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try{
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;

    } catch (error) {
      this.handExceptions( error );
    }
    
  }

  findAll( paginationDto: PaginationDto ) {
    const { limit = this.defaulLimit, offset = 0 } = paginationDto;

    return this.pokemonModel.find()
                            .limit( limit )
                            .skip(offset)
                            .sort({
                              no:1
                            })
                            .select('-__v');
  }

  async findOne(term: string){ 
  
    let pokemon: Pokemon;

    //validación por no
    if ( !isNaN(+term) ) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    //validación por MongoId
    if ( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term );
    }

    //validación por name
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({name: term.toLocaleLowerCase().trim()})
    }

    if( !pokemon ) throw new NotFoundException(`Pokemon with id, name or no "${ term }" not found`);

    return pokemon;

  }

  async update( term: string, updatePokemonDto: UpdatePokemonDto ) {
    
    const pokemon = await this.findOne( term );
    if ( updatePokemonDto.name ) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {

      await pokemon.updateOne( updatePokemonDto, { new: true })

      return { ...pokemon.toJSON(), ...updatePokemonDto};

    } catch (error) {
      this.handExceptions( error );
    }
    
  }

  async remove(id: string) {

  const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
  if ( deletedCount === 0 ) throw new BadRequestException(`Pokemon with id "${ id }" not found`);

  return ;
  }

  private handExceptions( error: any ) {
    if ( error.code === 11000){
        throw new BadRequestException(`Pokemon exist in db ${ JSON.stringify( error.keyValue )}`);
      }

      throw new InternalServerErrorException(`Can't create Pokemon - Check serve logs `)      
  }

}