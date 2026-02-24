'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CustomerInfo } from '@/types';

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    address: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.address || !customerInfo.phone) {
      alert('Please fill in all fields');
      return;
    }

    if (state.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        items: state.items,
        customerInfo,
        totalAmount: state.total,
      };

      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      setOrderId(data.data.id);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      alert('Error placing order: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced && orderId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-black mb-2">Order Placed!</h1>
              <p className="text-gray-600 mb-4">Thank you for your order</p>
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="text-lg font-mono font-bold text-black">{orderId}</p>
              </div>
            </div>
            <Button 
              onClick={() => window.location.href = `/orders/${orderId}`}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Track Order Status
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-lg border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-black">
              🛒 Checkout
            </h1>
            <div className="text-sm text-gray-600">
              Complete your order details
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-black">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => (
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
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-black">Total:</span>
                    <span className="text-xl font-bold text-black">
                      ${state.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-black">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-black mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleTextAreaChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      rows={3}
                      placeholder="123 Main St, Apt 4B, City, State 12345"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition-all"
                  >
                    {isSubmitting ? 'Placing Order...' : `Place Order - $${state.total.toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
