import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CATEGORY_SERVICE } from '../config/service.js';
import { envs } from '../config/envs.js';

@Module({
  controllers: [CategoriesController],
  providers: [],
  imports: [  ClientsModule.register([
        { name: CATEGORY_SERVICE , transport: Transport.TCP, options: {host: envs.categoriesMicroserviceHost, port: envs.categoriesMicroservicePort}},
      ])]
})
export class CategoriesModule {}
