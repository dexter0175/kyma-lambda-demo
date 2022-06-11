import {Entity, model, property} from '@loopback/repository';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  Product: string;

  @property({
    type: 'number',
    required: true,
  })
  Quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  UnitPrice: number;

  @property({
    type: 'string',
    required: true,
  })
  ShippingAddress: string;


  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
