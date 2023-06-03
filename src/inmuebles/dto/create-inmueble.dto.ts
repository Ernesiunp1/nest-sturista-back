import { IsInt, IsString, MinLength, IsPositive, IsArray, IsNumber, IsBoolean, IsOptional } from 'class-validator';


export class CreateInmuebleDto {

    @IsString()
    @MinLength(2)
    'usuario': string

    @IsString()
    'nombreAnuncio': any
 
    @IsString()
    @MinLength(2)
    'region': string
    
    @IsString()
    @MinLength(2)
    'ciudad': string
    
    @IsString()
    @MinLength(2)
    'nombre_inmueble': string

    @IsNumber()
    @IsPositive()
    'habitaciones': number

        
    @IsNumber()
    @IsPositive()
    'banos': number

        
    @IsBoolean()
    'amoblado': boolean

    @IsNumber()
    @IsPositive()
    'precio': number
    
      
    @IsString({each: true} )
    @IsArray()
    'tipo_inmuebles': string[]

    @IsString( {each: true} )
    @IsArray()
    'facilidades': string[]

    @IsString()
    @MinLength(2)
    'descripcion': string

    @IsBoolean()
    'suscripcion': boolean

    @IsString({each: true })
    @IsOptional()
    @IsArray()
    'etiquetas': string[]



}
