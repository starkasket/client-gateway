import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CLIENTS_SERVICE } from '../config/service.js';
import { envs } from '../config/envs.js';

@Module({
  controllers: [CustomersController],
  providers: [],
  imports: [ClientsModule.register([
    { name: CLIENTS_SERVICE, transport: Transport.TCP, options: { host: envs.clientsMicroserviceHost, port: envs.clientsMicroservicePort } },
  ])]
})
export class CustomersModule { }
