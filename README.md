# Food Delivery Order Management System

A complete food delivery order management feature built with Next.js 14, Express, and TypeScript.

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel]
- **Backend**: [Deployed on Render/Vercel]

## 📋 Features

- ✅ Menu display with 8 food items
- ✅ Shopping cart with quantity management
- ✅ Checkout with customer details
- ✅ Real-time order status tracking
- ✅ Modern UI with Tailwind CSS
- ✅ Full TypeScript implementation
- ✅ RESTful APIs with validation
- ✅ Responsive design

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Context + useReducer**
- **shadcn/ui components**

### Backend
- **Node.js + Express**
- **TypeScript**
- **Zod validation**
- **In-memory storage**
- **CORS enabled**

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd order-management-app
```

2. **Install dependencies**
```bash
npm install
npm run install:all
```

3. **Start development servers**
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:backend  # Backend on http://localhost:3001
npm run dev:frontend # Frontend on http://localhost:3000
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Menu API: http://localhost:3001/api/menu

## 🚀 Deployment

### Frontend (Vercel)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy to Vercel**
```bash
cd frontend
vercel --prod
```

3. **Configure Environment Variables**
```bash
vercel env add NEXT_PUBLIC_API_URL
# Value: https://your-backend-url.vercel.app
```

### Backend (Vercel Serverless)

1. **Create `vercel.json` in backend**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ]
}
```

2. **Deploy Backend**
```bash
cd backend
vercel --prod
```

### Alternative: Backend on Render

1. **Create `render.yaml`**
```yaml
services:
  - type: web
    name: order-management-api
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

2. **Connect GitHub repository to Render**

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📡 API Endpoints

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get specific menu item

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status

## 🎯 Order Status Flow

1. **Order Received** → ETA: 15-20 minutes
2. **Preparing** → ETA: 10-15 minutes  
3. **Out for Delivery** → ETA: 5-10 minutes
4. **Delivered** → Complete! 🎉

## 🏗️ Project Structure

```
order-management-app/
├── frontend/                 # Next.js frontend
│   ├── app/
│   │   ├── page.tsx        # Menu page
│   │   ├── checkout/       # Checkout page
│   │   └── orders/[id]/    # Order status page
│   ├── components/
│   │   ├── menu/           # Menu components
│   │   ├── cart/           # Cart components
│   │   └── ui/             # UI components
│   └── src/
│       ├── context/        # React Context
│       └── types/          # TypeScript types
├── backend/                 # Express backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── models/         # Data models
│   │   └── __tests__/      # Backend tests
│   └── package.json
└── README.md
```

## 🎨 UI Features

- Modern design with Tailwind CSS
- Responsive layout (mobile & desktop)
- Smooth animations and transitions
- Real-time order status updates
- Shopping cart with quantity management
- Form validation and error handling

## 🔧 Configuration

### Environment Variables

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend (.env)**
```
PORT=3001
NODE_ENV=development
```

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

For any questions or issues, please open an issue on GitHub.
