import { Module } from '@nestjs/common';
import { InmueblesService } from './inmuebles.service';
import { InmueblesController } from './inmuebles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inmueble } from './entities/inmueble.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [InmueblesController],
  providers: [InmueblesService],
  imports: [
    TypeOrmModule.forFeature([Inmueble]),
    AuthModule
  ]
})
export class InmueblesModule {}
