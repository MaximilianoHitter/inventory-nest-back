import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CryptModule } from './crypt/crypt.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { ProductsModule } from './products/products.module';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.register({
      store: redisStore,
      host: 'localhost', // Dirección de tu servidor Redis
      port: 6379,        // Puerto de tu servidor Redis
      ttl: 3600 * 1000,         // Tiempo de vida por defecto (en segundos)
      isGlobal: true,
      db: 0,
      keyPrefix: 'inventory-nest'
    }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_URL,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CryptModule,
    ProductsModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
