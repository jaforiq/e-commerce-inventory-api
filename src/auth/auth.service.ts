import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { Console } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, username, password } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ConflictException('Email or username already exists');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(savedUser);

    // Save refresh token
    await this.updateRefreshToken(savedUser.id, tokens.refreshToken);

    return {
      message: 'User registered successfully',
      user: {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
      },
      ...tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);
//console.log("Token: ", tokens);
    // Save refresh token
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      ...tokens,
    };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          username: true,
          password: true,
          refreshToken: true, 
        },
      });
//console.log(user);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }
//console.log("user1: ",user);
      const refreshTokenMatches = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );
//console.log("user2: ",user);
      if (!refreshTokenMatches) {
        throw new UnauthorizedException('Invalid refresh token');
      }
//console.log("user3: ",user);
      const tokens = await this.generateTokens(user);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        message: 'Tokens refreshed successfully',
        ...tokens,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await this.userRepository.update(userId, { refreshToken: null });
    return { message: 'Logout successful' };
  }

  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
}