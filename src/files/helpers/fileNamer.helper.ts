import { v4 as uuid } from "uuid";


export const fileNamer =  (req: Express.Request, file: Express.Multer.File, callback: Function) => {


    console.log({file});
    
    if ( !file ) return callback( new Error( 'Archivo vacio' ), false );

    const fileExtension =  file.mimetype.split('/')[1];

    const fileNAme= `${ uuid() }.${fileExtension}`



    callback(null, fileNAme)
 

    

} 
