export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  totalAmount: number;
  status: 'Order Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = Order['status'];
