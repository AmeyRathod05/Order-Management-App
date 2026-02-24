'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Order } from '@/types';

export default function OrderStatusPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrderStatus();
  }, [orderId]);

  useEffect(() => {
    // Set up polling for real-time updates only if order is not delivered
    if (order && order.status !== 'Delivered') {
      const interval = setInterval(fetchOrderStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [order?.status]);

  const fetchOrderStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/orders/${orderId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch order status');
      }
      
      const data = await response.json();
      setOrder(data.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const advanceOrderStatus = async () => {
    // This is a demo function to manually advance order status
    // In a real app, this would be handled by the backend
    if (!order || order.status === 'Delivered') {
      return;
    }
    
    const currentStatus = ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'];
    const nextStatuses = ['Preparing', 'Out for Delivery', 'Delivered'];
    
    const currentIndex = currentStatus.indexOf(order.status);
    if (currentIndex < currentStatus.length - 1) {
      const nextStatus = currentStatus[currentIndex + 1];
      
      // Call backend to update status
      try {
        await fetch(`http://localhost:3001/api/orders/${order.id}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: nextStatus }),
        });
        
        // Refresh order data
        fetchOrderStatus();
      } catch (error) {
        console.error('Failed to update order status:', error);
      }
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Order Received':
        return 'bg-blue-100 text-blue-800';
      case 'Preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out for Delivery':
        return 'bg-orange-100 text-orange-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Order Received':
        return '📋';
      case 'Preparing':
        return '👨‍🍳';
      case 'Out for Delivery':
        return '🚚';
      case 'Delivered':
        return '✅';
      default:
        return '❓';
    }
  };

  const getETA = (status: Order['status']) => {
    switch (status) {
      case 'Order Received':
        return 'ETA: 15-20 minutes';
      case 'Preparing':
        return 'ETA: 10-15 minutes';
      case 'Out for Delivery':
        return 'ETA: 5-10 minutes';
      case 'Delivered':
        return 'Delivered! 🎉';
      default:
        return 'Calculating...';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading order status...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-red-500">Order not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-lg border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-black">
              📦 Order Status
            </h1>
            <div className="text-sm text-gray-600">
              Tracking your delivery
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-2xl mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-black">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Order ID</p>
              <p className="text-lg font-mono font-bold text-black">{order.id}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Customer Information</p>
              <div className="space-y-1">
                <p className="text-black"><span className="font-medium">Name:</span> {order.customerInfo.name}</p>
                <p className="text-black"><span className="font-medium">Address:</span> {order.customerInfo.address}</p>
                <p className="text-black"><span className="font-medium">Phone:</span> {order.customerInfo.phone}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Order Items</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <h4 className="font-medium text-black">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-lg font-bold text-black">Total:</span>
              <span className="text-xl font-bold text-black">
                ${order.totalAmount.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Order Status Timeline */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-black">Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${getStatusColor(order.status)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getStatusIcon(order.status)}</span>
                    <div>
                      <h3 className="text-lg font-bold">{order.status}</h3>
                      <p className="text-sm opacity-75">
                        {getETA(order.status)}
                      </p>
                      <p className="text-xs opacity-60 mt-1">
                        Last updated: {new Date(order.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  {['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'].map((status, index) => (
                    <div key={status} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          getOrderStatusIndex(order.status) >= index
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {getOrderStatusIndex(order.status) >= index ? '✓' : index + 1}
                      </div>
                      {index < 3 && (
                        <div
                          className={`flex-1 h-1 mx-2 ${
                            getOrderStatusIndex(order.status) > index
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Manual Status Update Button (for demo) */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">
                  Demo: Advance order status manually
                </p>
                <Button
                  onClick={advanceOrderStatus}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  disabled={order.status === 'Delivered'}
                >
                  {order.status === 'Delivered' ? 'Order Delivered' : 'Advance Status'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getOrderStatusIndex(status: Order['status']): number {
  const statuses = ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'];
  return statuses.indexOf(status);
}
