import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { CLIENTS_SERVICE } from '../config/service.js';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from '../common/index.js';

@Controller('customers')
export class CustomersController {
  constructor(@Inject(CLIENTS_SERVICE) private readonly customersClient: ClientProxy) { }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersClient.send(  { cmd: 'create_customer' }, createCustomerDto).pipe(catchError((err) => { throw new RpcException(err); }),);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.customersClient.send({ cmd: 'find_all_customers' }, paginationDto).pipe(catchError((err) => { throw new RpcException(err); }),);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersClient.send({ cmd: 'find_one_customer' }, { id }).pipe(catchError((err) => { throw new RpcException(err); }),);

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersClient.send({ cmd: 'update_customer' }, { id, ...updateCustomerDto }).pipe(catchError((err) => { throw new RpcException(err); }),);

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersClient.send({ cmd: 'remove_customer' }, { id }).pipe(catchError((err) => { throw new RpcException(err); }),);

  }
}
