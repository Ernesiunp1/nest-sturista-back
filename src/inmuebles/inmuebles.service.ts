import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Inmueble } from './entities/inmueble.entity';
import { InmueblesController } from './inmuebles.controller';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';

import { validate as isUUID } from "uuid";
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class InmueblesService {

  private readonly logger = new Logger('InmueblesService')

  constructor(
     @InjectRepository(Inmueble)
     private readonly inmuebleRepository: Repository<Inmueble> 
  ){}


  

  async create (createInleDto: CreateInmuebleDto, user: User) {

    try {

  }


  async findAll( CreateInmuebleDto, PaginationDto: PaginationDto ) {

    const { limit = 10, offset=0 } = PaginationDto

    try {
      const inmuebles = await this.inmuebleRepository.find( {take: limit, skip: offset})
      return inmuebles;
      
    } catch (error) {
      this.handlerDBExceptions(error)    
    }

  }

  async findOne(termino: string ) {

    let inmueble: Inmueble

       if(isUUID(termino)){
           inmueble = await this.inmuebleReposito.indOneBy( { id: termino } )
       }else {         
           inmueble=  await this.inmuebleRepository.findOneBy( { nombre_inmueble: termino } ) 
      }
    
      if (!inmueble) {
        throw new NotFoundException(`EL Inmueble con el id ${termino} no fue encontrado` );
      }

    return inmueble;
            

  }

  async update(id: string, updateInmuebleDto: UpdateInmuebleDto, user: User) {

    const inmueble = await this.inmuebleRepository.preload({
      id: id,
      ...updateInmuebleDto
    })

    if (!inmueble) throw new NotFoundException(` El Inmueble con el id ${id} no fue esncontrado `);

    try {
      inmueble.user = user
      await this.inmuebleRepository.save(inmueble);
      return  inmueble
      
    } catch (error) {

      this.handlerDBExceptions(error)    
      
    }

  }














  async remove(id: string) {
    const inmueble =  await this.findOne(id)
    await this.inmuebleRepository.remove(inmueble)
    
    return `El Inmueble con el Id #${id} fue eliminado`;

  }



  private handlerDBExceptions ( error: any){
    console.log(error);
    if (error.code === '23505' )
    throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    throw new InternalServerErrorException("Error Inesperado, chequea los logs del servidor");

  }


}
