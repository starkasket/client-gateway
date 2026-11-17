import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { CustomersModule } from './customers/customers.module.js';

@Module({
  imports: [ProductsModule, OrdersModule, CategoriesModule, CustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
