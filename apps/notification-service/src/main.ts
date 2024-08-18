import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { RabbitmqConfig } from './config';

async function bootstrap() {
  const ctx = await NestFactory.createApplicationContext(AppModule);
  const rabbitmqConfig = ctx.get<RabbitmqConfig>(RabbitmqConfig);
  await ctx.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitmqConfig.url],
        queue: rabbitmqConfig.queue,
      },
    },
  );

  await app.listen();
}
void bootstrap();
