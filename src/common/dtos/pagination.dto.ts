import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto{

    @IsOptional()
    @IsPositive()
    @Type( ()=> Number ) //enableImplicitConverstion: true
    limit?: number


    @IsOptional()
   
    @Min(0)
    @Type( ()=> Number ) //enableImplicitConverstion: true
    offset?: number

}