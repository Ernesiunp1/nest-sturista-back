import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
//import { CreateAuthDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-user.dto';


import { CreateUserDto, LoginUserDto } from './dto'
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
       
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }


  @Get('checkStatus')
  @Auth()
  checkAuthStatus(
   @GetUser() user: User //todo: resivir algo
  ){
    return this.authService.checkAuthStatus(  user )
  }


  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivate(
    @GetUser() user: User,
    @GetUser('email') userEmail: string  ,
    @Req() request: Express.Request,
    @RawHeaders() rawheaders: string[]

  ){ 

    console.log(request);
    
    return {ok: true,
            mensaje: 'Hola Mundo',
            user: user,
            userEmail: userEmail,
            rawheaders: rawheaders
          }
  };



  // @SetMetadata('roles', ['user', 'admin'])


  @Get('private2')
  @RoleProtected( ValidRoles.user )
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2(@GetUser() user: User  ){
    return{
      ok: true,
      user: user
    }

  }


  @Get('private3')
  @Auth( ValidRoles.admin, ValidRoles.user )
  privateRoute3(@GetUser() user: User  ){
    return{
      ok: true,
      user: user
    }

  } 


}
