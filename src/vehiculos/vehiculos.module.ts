import { Module } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';


import { Vehiculo } from './entities/vehiculo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [VehiculosController],
  providers: [VehiculosService],
  imports:[
    TypeOrmModule.forFeature([ Vehiculo ]),
    AuthModule
  ]
})
export class VehiculosModule {}
