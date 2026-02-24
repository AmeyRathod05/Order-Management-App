'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export function CartSidebar() {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  if (state.items.length === 0) {
    return (
      <div className="fixed right-4 top-4 z-50">
        <Card className="w-80 p-4 shadow-2xl border-0 bg-white">
          <div className="flex items-center justify-center text-gray-700">
            <ShoppingCart className="w-6 h-6 mr-2" />
            Cart is empty
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed right-4 top-4 z-50">
      <Card className="w-80 max-h-96 overflow-y-auto shadow-2xl border-0 bg-white">
        <CardHeader className="flex flex-row items-center justify-between bg-gray-50">
          <CardTitle className="text-lg font-bold text-black">
            Cart ({getTotalItems()} items)
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={clearCart}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {state.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-black">{item.name}</h4>
                <p className="text-xs text-gray-600">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 border-gray-300 hover:bg-gray-100"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="text-sm w-8 text-center font-medium text-black">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 border-gray-300 hover:bg-gray-100"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-black">Total:</span>
              <span className="font-bold text-lg text-black">
                ${state.total.toFixed(2)}
              </span>
            </div>
            <Link href="/checkout">
              <Button className="w-full bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition-all">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
