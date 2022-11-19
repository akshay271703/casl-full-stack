import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './auth/groups/groups.module';
import { UsersModule } from './auth/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'root',
      database: 'casl',
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true,
      logging: true,
      keepConnectionAlive: true,
    }),
    GroupsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
