import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';


@Injectable()
export class FilesService {
  
  getStaticInmueblesImage( imageName: string ){

    const path = join (__dirname, '../../static/inmuebles', imageName );

    if ( !existsSync(path) ) {
        throw new BadRequestException(` No se encontro la imagen con nombre: ${ imageName } `);
         
    }

    return path

  }


}
