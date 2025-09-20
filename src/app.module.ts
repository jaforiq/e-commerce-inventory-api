import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { ProductsModule } from './products/products.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './products/entities/product.entity.ts';
import { Category } from './categories/entities/category.entity';
import { StaticFilesModule } from './common/static-files.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Category, Product],
        synchronize: true, // Only for development
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      }),
      inject: [ConfigService],
    }),
    StaticFilesModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}