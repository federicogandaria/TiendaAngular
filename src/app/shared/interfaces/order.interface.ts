export interface IDetails {
  productId:number;
  productName: string;
  quantity: number;
}

export interface IOrder {
  name:string;
  shippingAddress: string;
  city: string;
  date: string;
  isDelivery: boolean;
  id: number;
}

export interface IDetailsOrder {
  details: IDetails[];
  orderId: number;
}
