// import {
//   Controller,
//   Post,
//   Body,
//   HttpCode,
//   HttpStatus,
//   UseGuards,
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { Public } from './decorators/public.decorator';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { GetUser } from './decorators/get-user.decorator';
// import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
// import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

// @ApiTags('Authentication')
// @Controller('api/auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Public()
//   @Post('register')
//   @ApiOperation({ summary: 'Register a new user' })
//   @ApiResponse({ status: 201, description: 'User registered successfully' })
//   @ApiResponse({ status: 409, description: 'Email or username already exists' })
//   async register(@Body() registerDto: RegisterDto) {
//     return this.authService.register(registerDto);
//   }

//   @Public()
//   @Post('login')
//   @HttpCode(HttpStatus.OK)
//   @ApiOperation({ summary: 'User login' })
//   @ApiResponse({ status: 200, description: 'Login successful' })
//   @ApiResponse({ status: 401, description: 'Invalid credentials' })
//   async login(@Body() loginDto: LoginDto) {
//     return this.authService.login(loginDto);
//   }

//   @Public()
//   @Post('refresh')
//   @HttpCode(HttpStatus.OK)
//   @ApiOperation({ summary: 'Refresh access token' })
//   @ApiResponse({ status: 200, description: 'Tokens refreshed successfully' })
//   @ApiResponse({ status: 401, description: 'Invalid refresh token' })
//   async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
//     return this.authService.refreshTokens(refreshTokenDto);
//   }

//   @Post('logout')
//   @HttpCode(HttpStatus.OK)
//   @UseGuards(JwtAuthGuard)
//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'User logout' })
//   @ApiResponse({ status: 200, description: 'Logout successful' })
//   @ApiResponse({ status: 401, description: 'Unauthorized' })
//   async logout(@GetUser('id') userId: string) {
//     return this.authService.logout(userId);
//   }
// }

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { Public } from './decorators/public.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { 
  LoginResponseDto, 
  RegisterResponseDto, 
  RefreshTokenResponseDto,
  ErrorResponseDto 
} from '../common/dto/swagger-response.dto';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ 
    summary: 'Register a new user',
    description: 'Create a new user account with email, username and password'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'User registered successfully',
    type: RegisterResponseDto
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Email or username already exists',
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Validation failed',
    type: ErrorResponseDto
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'User login',
    description: 'Authenticate user with email and password, returns JWT tokens'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    type: LoginResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid credentials',
    type: ErrorResponseDto
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Refresh access token',
    description: 'Get new access and refresh tokens using valid refresh token'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Tokens refreshed successfully',
    type: RefreshTokenResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid refresh token',
    type: ErrorResponseDto
  })
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'User logout',
    description: 'Invalidate refresh token and logout user'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Logout successful',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Logout successful' }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing JWT token',
    type: ErrorResponseDto
  })
  async logout(@GetUser('id') userId: string) {
    return this.authService.logout(userId);
  }
}