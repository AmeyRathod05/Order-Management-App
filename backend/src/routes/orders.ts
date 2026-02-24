import { Router } from 'express';
import { z } from 'zod';
import { Order, CustomerInfo, CartItem } from '../models/order';
import { menuItems } from '../models/menu';

const router = Router();

// In-memory order storage
const orders: Order[] = [];
let orderIdCounter = 1;

// Validation schemas
const customerInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone is required'),
});

const cartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  category: z.string(),
  quantity: z.number().min(1),
});

const orderSchema = z.object({
  items: z.array(cartItemSchema).min(1, 'At least one item is required'),
  customerInfo: customerInfoSchema,
  totalAmount: z.number().min(0.01),
});

// POST /api/orders - Create new order
router.post('/', (req, res) => {
  try {
    const orderData = orderSchema.parse(req.body);
    
    const newOrder: Order = {
      id: `ORDER-${orderIdCounter++}`,
      items: orderData.items,
      customerInfo: orderData.customerInfo,
      totalAmount: orderData.totalAmount,
      status: 'Order Received',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    orders.push(newOrder);

    // Simulate order status progression (for demo purposes)
    setTimeout(() => updateOrderStatus(newOrder.id, 'Preparing'), 5000);
    setTimeout(() => updateOrderStatus(newOrder.id, 'Out for Delivery'), 10000);
    setTimeout(() => updateOrderStatus(newOrder.id, 'Delivered'), 15000);

    res.status(201).json({
      success: true,
      data: newOrder,
      message: 'Order placed successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// GET /api/orders/:id - Get order by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const order = orders.find(o => o.id === id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// GET /api/orders - Get all orders (admin)
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// PUT /api/orders/:id/status - Update order status
router.put('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const orderIndex = orders.findIndex(o => o.id === id);
    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date();

    res.json({
      success: true,
      data: orders[orderIndex],
      message: 'Order status updated',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Helper function to update order status (for simulation)
function updateOrderStatus(orderId: string, status: Order['status']) {
  const orderIndex = orders.findIndex(o => o.id === orderId);
  if (orderIndex !== -1) {
    // Don't update if order is already delivered
    if (orders[orderIndex].status === 'Delivered') {
      return;
    }
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date();
    console.log(`Order ${orderId} status updated to: ${status}`);
  }
}

export default router;
