import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { loadDbConfig } from './config/db.config';
import { UserController } from './controllers';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { cacheConfig } from './config/cache.config';
import { UserService } from './services/user.service';
import { User } from './model/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot(loadDbConfig),
    SequelizeModule.forFeature([User])
    // CacheModule.register<RedisClientOptions>(cacheConfig),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
