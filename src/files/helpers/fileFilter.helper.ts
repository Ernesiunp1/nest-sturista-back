


export const fileFilter =  (req: Express.Request, file: Express.Multer.File, callback: Function) => {


    console.log({file});
    
    if ( !file ) return callback( new Error( 'Archivo vacio' ), false )


    const fileExtension = file.mimetype.split('/')[1]
    const validExtensions= ['png', 'jpg', 'jpeg']

    if (validExtensions.includes(fileExtension)) {
        return callback(null, true)
    } else {
        callback(null, false)
    }


    

} 
