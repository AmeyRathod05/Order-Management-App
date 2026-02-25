'use client';

import { MenuGrid } from '@/components/menu/MenuGrid';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { EnvironmentIndicator } from '@/components/debug/EnvironmentIndicator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-lg border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-black">
              🍕 Food Delivery
            </h1>
            <div className="text-sm text-gray-600">
              Order delicious food from our menu
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">
            Our Menu
          </h2>
          <p className="text-gray-600">
            Choose from our selection of delicious dishes
          </p>
        </div>
        
        <MenuGrid />
      </main>

      <CartSidebar />
      <EnvironmentIndicator />
    </div>
  );
}
