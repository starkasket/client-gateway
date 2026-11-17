import { Controller, Get, Post, Body, Param, Inject, Query, Patch, ParseUUIDPipe } from '@nestjs/common';
import { ORDER_SERVICE } from '../config/service.js';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from '../common/index.js';
import { CreateOrderDto, OrderPaginationDto, ChangeOrderStatusDto, StatusDto } from './dto/index.js'


@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.ordersClient.send({ cmd: 'findAllOrders' }, paginationDto);
  }

  @Get('id/:id')
  //findOne(@Param('id', ParseUUIDPipe) id: string) {  
  findOne(@Param('id') id: string) {
    return this.ordersClient.send({ cmd: 'findOneOrder' }, { id }).pipe(catchError((err) => { throw new RpcException(err); }),);
  }

  @Get(':status')
  findAllByStatus(@Param() statusDto: StatusDto, @Query() paginationDto: PaginationDto) {
    return this.ordersClient.send({ cmd: 'findAllOrders' }, { ...paginationDto, status: statusDto.status }).pipe(catchError((err) => { throw new RpcException(err); }),);
  }

  @Patch(':id')
  changeOrderStatus(@Param('id', ParseUUIDPipe) id: string, @Body() changeOrderStatusDto: ChangeOrderStatusDto,) {
    return this.ordersClient.send({ cmd: 'changeOrderStatus' }, { id, status: changeOrderStatusDto.status },).pipe(catchError((err) => { throw new RpcException(err); }),);
    //return this.ordersClient.send({ cmd: 'changeOrderStatus' }, { id, status: statusDTO.status },).pipe(catchError((err) => { throw new RpcException(err); }),);
  }

  /*  @Patch() */


}
