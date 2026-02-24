'use client';

import Image from 'next/image';
import { MenuItem } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-black">{item.name}</CardTitle>
          <span className="text-lg font-bold text-black bg-green-100 px-2 py-1 rounded">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <CardDescription className="text-sm text-gray-700">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={() => addToCart(item)}
          className="w-full bg-black text-white hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
