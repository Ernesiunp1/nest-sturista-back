import { IsEmail, IsString, IsStrongPassword, IsNumber, IsPositive, IsBoolean,  IsOptional, IsArray, MinLength, MaxLength, Matches, min } from 'class-validator';


export class CreateUserDto {

 
    @IsString()
    nombre: string
 
    @IsString()    
    aliasUsuario: string

    @IsString()
    @IsOptional()
    apellido: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La clave debe tener al menos 6 caracteres una mayuscula, minusculas y un numero'
    })
    password: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()    
    telefono: number

    // @IsBoolean()
    // suscripcion: boolean

    // @IsBoolean()
    // isActive:  boolean

    // @IsString( )
    // @IsArray( {each: true} )
    // roles: string[]



}
