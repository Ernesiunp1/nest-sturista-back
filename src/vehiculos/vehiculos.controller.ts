import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { Vehiculo } from './entities/vehiculo.entity';
import { UUIDVersion } from 'class-validator';
import { query } from 'express';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('vehiculos')
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  
  @Post()
  @Auth(  )
  create(@Body() createVehiculoDto: CreateVehiculoDto,
         @GetUser() user: User
          ) {
    return this.vehiculosService.create(createVehiculoDto, user);
  }


  @Get()
  findAll(@Query() paginationDto: PaginationDto,  CreateVehiculoDto: CreateVehiculoDto ) {
    console.log(paginationDto);
    
    return this.vehiculosService.findAll( CreateVehiculoDto, paginationDto );
  }
 
  @Get(':termino')
  findOne(@Param('termino') termino: string) {
    return this.vehiculosService.findOne( termino )
    ;
  }

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateVehiculoDto: UpdateVehiculoDto
    ){

    return this.vehiculosService.update( id, updateVehiculoDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.vehiculosService.remove(id);
  }
}



















// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { VehiculosService } from './vehiculos.service';
// import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
// import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
// import { Auth } from 'src/auth/decorators/auth.decorator';
// import { User } from 'src/auth/entities/user.entity';
// import { GetUser } from 'src/auth/decorators/get-user.decorator';

// @Controller('vehiculos')
// // @Auth()
// export class VehiculosController {
//   constructor(private readonly vehiculosService: VehiculosService) {}

  
//   @Post()
//   create(@Body() createVehiculoDto: CreateVehiculoDto,
//           @GetUser() user: User      
//   ) {
//     return this.vehiculosService.create(createVehiculoDto, user);
//   }

//   @Get()
//   findAll() {
//     return this.vehiculosService.findAll();  
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.vehiculosService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateVehiculoDto: UpdateVehiculoDto) {
//     return this.vehiculosService.update(+id, updateVehiculoDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.vehiculosService.remove(+id);
//   }
// }
