import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs.js';
import { ORDER_SERVICE } from '../config/service.js';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
       ClientsModule.register([
        { name: ORDER_SERVICE , transport: Transport.TCP, options: {host: envs.ordersMicroserviceHost, port: envs.ordersMicroservicePort}},
      ])
    ]
})
export class OrdersModule {}
