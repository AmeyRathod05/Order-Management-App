export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and extra virgin olive oil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop',
    category: 'Pizza'
  },
  {
    id: '2',
    name: 'Classic Burger',
    description: 'Beef patty, lettuce, tomato, onion, pickles, and special sauce',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Burger'
  },
  {
    id: '3',
    name: 'Salmon Sushi Roll',
    description: 'Fresh salmon, avocado, and cucumber with wasabi and ginger',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    category: 'Sushi'
  },
  {
    id: '4',
    name: 'Caesar Salad',
    description: 'Romaine lettuce, parmesan cheese, croutons, and Caesar dressing',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1746211108786-ca20c8f80ecd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Salad'
  },
  {
    id: '5',
    name: 'Chicken Wings',
    description: 'Crispy chicken wings with your choice of buffalo or BBQ sauce',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1614398751058-eb2e0bf63e53?q=80&w=1014&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Appetizer'
  },
  {
    id: '6',
    name: 'Pasta Carbonara',
    description: 'Spaghetti with bacon, eggs, parmesan cheese, and black pepper',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Pasta'
  },
  {
    id: '7',
    name: 'Fish Tacos',
    description: 'Grilled fish, cabbage slaw, cilantro, and lime crema in corn tortillas',
    price: 10.49,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop',
    category: 'Taco'
  },
  {
    id: '8',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1673551490812-eaee2e9bf0ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Dessert'
  }
];
