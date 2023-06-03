import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { InmueblesService } from './inmuebles.service';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { Inmueble } from './entities/inmueble.entity';
import { UUIDVersion } from 'class-validator';
import { query } from 'express';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('inmuebles')
export class InmueblesController {
  constructor(private readonly inmueblesService: InmueblesService) {}

  
  @Post() 
  @Auth(  )
  create(@Body() createInmuebleDto: CreateInmuebleDto,
          @GetUser() user: User
          ) {
    return this.inmueblesService.create(createInmuebleDto, user);
  }


  @Get()
  findAll(@Query() paginationDto: PaginationDto,  CreateInmuebleDto: CreateInmuebleDto ) {
    console.log(paginationDto);
    
    return this.inmueblesService.findAll( CreateInmuebleDto, paginationDto );
  }
 
  @Get(':termino')
  findOne(@Param('termino') termino: string) {
    return this.inmueblesService.findOne( termino )
    ;
  }

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateInmuebleDto: UpdateInmuebleDto
    ){

    return this.inmueblesService.update( id, updateInmuebleDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.inmueblesService.remove(id);
  }
}
