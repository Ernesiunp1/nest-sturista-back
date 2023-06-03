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
      host: process.env.DB_HOST,
      port:   +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
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
