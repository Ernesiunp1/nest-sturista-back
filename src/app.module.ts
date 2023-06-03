import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { InmueblesModule } from './inmuebles/inmuebles.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({

      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl: process.env.STAGE === 'prod'
        ? {rejectUnauthorized: false}
        : null,
      },
      type: 'postgres',
      host: 'localhost',
      port:   5432,
      database: 'sTuristadb',
      username: 'postgres',
      password: 'sTurista123',
      autoLoadEntities: true,
      synchronize: true,

    }),

    VehiculosModule,

    InmueblesModule,

    CommonModule,

    FilesModule,

    AuthModule
  ],
  
})
export class AppModule {}
