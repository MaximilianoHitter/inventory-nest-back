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
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    CryptModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
