import { IsString, IsBoolean, IsNumber, Min, MinLength, IsPositive, IsIn, IsOptional} from "class-validator"
import { Unique } from "typeorm"


 

export class CreateVehiculoDto {

 
    @IsString()
    @MinLength(3)
    "usuario": string

    @IsString()
    "nombreAnuncio": string

    @IsString()
    @MinLength(3)
    "region": string
    
    @IsString()
    @MinLength(3)   
    "ciudad": string

    @IsString()
    "tipo_vehiculo": string
    
    @IsString()
    @MinLength(3)   
    "modelo": string
  
    @IsNumber()
    @Min(4)
    @IsPositive()
    "anio": number

    @IsString()
    @MinLength(3)
    "marca": string


    @IsNumber()
    @Min(1)
    @IsPositive()
    "puestos": number

    @IsBoolean()
    "aire": boolean

    @IsString()
    @MinLength(5)
    "descripcion": string

    @IsNumber()
    @IsOptional()
    @Min(4)
    "precio": number

    @IsBoolean()
    "subscripcion": boolean


}
