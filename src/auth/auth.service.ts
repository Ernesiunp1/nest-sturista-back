import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import {  } from './dto/create-user.dto';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt'
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtservice: JwtService
  ){}
  
  async create(createUserDto: CreateUserDto) {
    

    try {

      const {password, ...userData} = createUserDto
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      })
 
      await this.userRepository.save( user )
      delete user.password
      
      return {
        ...user,
        token: this.getJwtToken( { id: user.id } ) 
      }

    } catch (error) {
      this.handlerDbErrors(error)
      
    }

  }




  async login( loginUserDto: LoginUserDto ){

    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne({
      
      where: {email},
      select: {email: true, password: true, id: true, nombre: true}
     });

     if (!user) 
     throw new UnauthorizedException("credenciales no son validas!");
     
     if (!bcrypt.compareSync(password, user.password)) {
       throw new UnauthorizedException("credenciales no son validas.");
      }
    // const nombreUsuario = await this.userRepository.findOne({
    //   where: {nombre},
    //   select: {nombre: true}
    // })
       
    return {
      ...user,
      token: this.getJwtToken( { id: user.id,  } ) 
      
    }
     

  }
   



  checkAuthStatus(user : User){

    return {
      ...user,
      token: this.getJwtToken( { id: user.id,  } ) 
    }

  }
 
  
  private getJwtToken( payload: JwtPayload ){
    const token =  this.jwtservice.sign( payload )
    return token

  }




  private handlerDbErrors(error: any){

    if (error.code === '23505') {

      throw new BadRequestException(error.detail);
    
      console.log(error)
      
      throw new InternalServerErrorException("Por favor chequea los errores en los log del servidor");
      
      
      
      
    }

  }





}
