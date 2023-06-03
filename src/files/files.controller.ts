import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadGatewayException } from '@nestjs/common';
import { FilesService } from './files.service';
import {  UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';


@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
    ) {}

  @Get('inmuebles/:imageName')
  findInmuebleImagen(
    @Res() res: Response,
    @Param('imageName') imageName: string 
  ){

    const path = this.filesService.getStaticInmueblesImage(imageName);

   res.sendFile( path )

  }


@Post('inmuebles')
@UseInterceptors( FileInterceptor('file', {
  fileFilter: fileFilter,
  // limits: { fileSize: 1000 }
  storage: diskStorage({
    destination: './static/inmuebles',
    filename: fileNamer
  })
}) )

imagenInmuebles(
  @UploadedFile() file: Express.Multer.File
  ){

    if (!file) {
      throw new BadGatewayException(" Debe adjuntar una Imagen valida ('png', 'jpg', 'jpeg') ");
    }

    //  console.log({ fileInController: file });

    //const secureUrl = `  http://localhost:3000/api/files/inmuebles/2d000509-bd78-40ac-9343-c80b4af7b053.png`
    const secureUrl = `${ this.configService.get( 'HOST_API' ) }/files/inmuebles/${file.filename} `;
       
    
    return  { secureUrl }


}


}
