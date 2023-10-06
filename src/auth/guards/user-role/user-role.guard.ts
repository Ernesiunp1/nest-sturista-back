import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/auth/entities/user.entity';
import { META_ROLES } from '../../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor( private readonly reflector: Reflector ){}



    const req = context.switchToHttp().getRequest()
    const user = req.user  as User
   
    if (!user) 
      throw new BadRequestException( "Usuario no encontrado" );

      
    console.log({userRoles: user.roles });
 
    for (const role of user.roles) {
      if (validRoles.includes(role)) {

        return true
        
      }
      
    }

    throw new ForbiddenException(`se necesita un role valido [${validRoles}] `);
    
    

    return true;
  }
}
