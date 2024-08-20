import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { DatabaseModule } from '../database/database.module';
import { User } from '../../entities/User';
import { Weather } from '../../entities/Weather';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User, Weather])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
