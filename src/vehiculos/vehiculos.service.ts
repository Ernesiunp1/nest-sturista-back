import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Vehiculo } from './entities/vehiculo.entity';
import { VehiculosController } from './vehiculos.controller';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';

import { validate as isUUID } from "uuid";
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class VehiculosService {

  private readonly logger = new Logger('InmueblesService')

  constructor(
     @InjectRepository(Vehiculo)
     private readonly vehiculoRepository: Repository<Vehiculo> 
  ){}


  

  async create (createVehiculoDto: CreateVehiculoDto, user: User) {

    try {
           
      const vehiculo= this.vehiculoRepository.create( createVehiculoDto )
      vehiculo.user = user
      
      await this.vehiculoRepository.save(vehiculo)
      return {...vehiculo, user} 
      
    } catch (error) {
      this.handlerDBExceptions(error)                        
    }

  }


  async findAll( CreateVehiculoDto, PaginationDto: PaginationDto ) { 

    const { limit = 10, offset=0 } = PaginationDto

    try {
      const vehiculos = await this.vehiculoRepository.find( {take: limit, skip: offset})
      return vehiculos;
      
    } catch (error) {
      this.handlerDBExceptions(error)    
    }

  }

  async findOne(termino: string ) {

    let vehiculo: Vehiculo

       if(isUUID(termino)){
           vehiculo = await this.vehiculoRepository.findOneBy( { id: termino } )
       }else {         
           vehiculo=  await this.vehiculoRepository.findOneBy( { tipo_vehiculo: termino } ) 
      }
    
      if (!vehiculo) {
        throw new NotFoundException(`EL Vehiculo con el id ${termino} no fue encontrado` );
      }

    return vehiculo;
            

  }

  async update(id: string, updateVehiculoDto: UpdateVehiculoDto, user: User) {

    const vehiculo = await this.vehiculoRepository.preload({
      id: id,
      ...updateVehiculoDto
    })

    if (!vehiculo) throw new NotFoundException(` El Vehiculo con el id ${id} no fue esncontrado `);

    try {
      vehiculo.user = user
      await this.vehiculoRepository.save(vehiculo);
      return  vehiculo
      
    } catch (error) {

      this.handlerDBExceptions(error)    
      
    }

  }



  async remove(id: string) {
    const vehiculo =  await this.findOne(id)
    await this.vehiculoRepository.remove(vehiculo)
    
    return `El Vehiculo con el Id #${id} fue eliminado`;

  }



  private handlerDBExceptions ( error: any){
    console.log(error);
    if (error.code === '23505' )
    throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    throw new InternalServerErrorException("Error Inesperado, chequea los logs del servidor");

  }


}









// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
// import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

// import { Vehiculo } from './entities/vehiculo.entity';
// import { InternalServerErrorException } from '@nestjs/common/exceptions';
// import { User } from 'src/auth/entities/user.entity';

// @Injectable()
// export class VehiculosService {
  
//   constructor(
//     @InjectRepository(Vehiculo)
//     private readonly vehiculoRepository: Repository<Vehiculo>

//   ){}
  

  
//   async create(createVehiculoDto: CreateVehiculoDto, user: User) {

//     try {
      
//       const vehiculo = this.vehiculoRepository.create( createVehiculoDto )
//        vehiculo.user = user
      
//        await this.vehiculoRepository.save( vehiculo )

//       return {...vehiculo, user}

//     } catch (error) {
//       console.log(error)
//       throw new InternalServerErrorException("Ayuda");
            
//     }


//     return 'This action adds a new vehiculo';
//   }



 

//   findAll() {
//     return `This action returns all vehiculos`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} vehiculo`;
//   }

//   update(id: number, updateVehiculoDto: UpdateVehiculoDto) {
//     return `This action updates a #${id} vehiculo`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} vehiculo`;
//   }
// }
