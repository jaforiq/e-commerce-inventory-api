import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { StaticFilesModule } from './common/static-files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const synchronize = config.get<string>('DB_SYNCHRONIZE') === 'true';

        return {
          type: 'postgres',
          url: config.get<string>('DATABASE_URL'), 
          autoLoadEntities: true,
          synchronize,

          ssl: { rejectUnauthorized: false },
          extra: {
            ssl: { rejectUnauthorized: false },
            max: 5,
          },

          keepConnectionAlive: true,
        } as any;
      },
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


