import { NestFactory } from '@nestjs/core';
import { SeederModule } from './modules/seeder/seeder.module';
import { SeederService } from './modules/seeder/seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);
  const seederService = appContext.get(SeederService);
  await seederService.seed();
  console.log('Database has been populated with seeds');
  await appContext.close();
  process.exit(0);
}
bootstrap();
