
import { IsEnum } from 'class-validator';
import { OrderStatusList } from '../enum/order.enum.js';
import { OrderStatus } from '../enum/order.enum.js';

export class ChangeOrderStatusDto {
    @IsEnum(OrderStatusList, {
        message: `Valid status are: ${OrderStatusList.join(', ')}`,
    })
    status!: OrderStatus;
}
