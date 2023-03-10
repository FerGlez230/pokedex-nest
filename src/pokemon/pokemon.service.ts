import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit: number;
  constructor( 
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService) {
      this.defaultLimit = configService.get<number>('defaultLimit');
  }
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error)
    }

  }
  async createMany( pokemons: CreatePokemonDto[]) {
    try {
      await this.pokemonModel.insertMany(pokemons);
      return 'Sucess';
    } catch (error) {
      this.handleException(error)
    }
  }

  findAll({offset = 0, limit = this.defaultLimit }: PaginationDto) {
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .select('-__v');
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if( !isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({no: term})
    }
    if( !pokemon &&  isValidObjectId( term )){
      pokemon = await this.pokemonModel.findById( term )
    }
    if( !pokemon ) {
      pokemon = await this.pokemonModel.findOne( { name: term.toLowerCase().trim()} )
    }
    if( !pokemon ) throw new NotFoundException(`Pokemon with term ${term} not found`)
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if( updatePokemonDto.name ) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim()
    }
    try {
      await pokemon.updateOne(updatePokemonDto, {new: true });
      return {...pokemon.toJSON(), ...updatePokemonDto};

    } catch (error) {
      this.handleException(error)
    }

  }

  async remove(id: string) {
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
    if( deletedCount === 0)
     throw new BadRequestException(`Pokemon with Id: ${id} not found `)
  }
  async removeMany() {
    await this.pokemonModel.deleteMany({});
  }
  private handleException( error : any) {
    if( error.code === 11000){
      throw new BadRequestException(`Pokemon already exists on db ${JSON.stringify(error.keyValue)}`) 
    }
    else{
      throw new InternalServerErrorException(error)
    }
  }
}
