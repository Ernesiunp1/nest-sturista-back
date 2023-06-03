import { ExecutionContext, createParamDecorator, InternalServerErrorException } from '@nestjs/common';


export const GetUser =  createParamDecorator(
     ( data: string, ctx: ExecutionContext ) => {

        const req = ctx.switchToHttp().getRequest()
        const user = req.user

        if (!user) {
            throw new InternalServerErrorException("falta el usuario en la request, no fue encontrado en la req.");
        }
            
        return (!data) ? user : user[data]
     

        


} )