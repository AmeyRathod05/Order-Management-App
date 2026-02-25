# 🧪 Testing Guide

## 📋 Environment Testing

### 🔍 Development Environment
```bash
# Start development servers
npm run dev

# Check environment indicator in bottom-left
# Should show: Environment: development
# API URL: http://localhost:3001
```

### 🚀 Production Build Test (Local)
```bash
# Test production build locally before deploying
cd frontend
npm run test:prod

# This will:
# 1. Build the app with production optimizations
# 2. Start local production server on http://localhost:3000
# 3. Use production environment variables
```

### 🌐 Production Environment Variables

#### Development (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Production (.env.production)
```
NEXT_PUBLIC_API_URL=https://order-app-theta.vercel.app
```

## 🔧 Debug Information

The environment indicator shows:
- **Environment**: development/production
- **API URL**: Current API base URL
- **Env Var**: Value of NEXT_PUBLIC_API_URL
- **Origin**: Current window location

## 📱 Testing Checklist

### ✅ Before Deploying
1. **Test locally**: `npm run test:prod`
2. **Check environment indicator**: Shows correct API URLs
3. **Test cart functionality**: Add items, checkout, order status
4. **Verify API calls**: Check browser dev tools network tab

### ✅ After Deploying
1. **Visit production URL**: https://order-app-theta.vercel.app
2. **Check environment indicator**: Should be hidden (production mode)
3. **Test full flow**: Menu → Cart → Checkout → Order Status
4. **Verify API endpoints**: All calls go to production URL

## 🐛 Common Issues

### 📍 Cart not working in production
- **Cause**: Environment variables not loaded
- **Fix**: Check .env.production file
- **Test**: `npm run test:prod` locally

### 📍 Order status not showing
- **Cause**: API URL pointing to localhost
- **Fix**: Verify environment variables
- **Debug**: Check browser console for API calls

### 📍 CORS errors
- **Cause**: Backend CORS configuration
- **Fix**: Update backend CORS origins
- **Test**: Check API endpoints directly

## 🚀 Quick Commands

```bash
# Development
npm run dev

# Test production locally
npm run test:prod

# Deploy to Vercel
vercel --prod

# Check environment
curl http://localhost:3001/api/menu
curl https://order-app-theta.vercel.app/api/menu
```

## 📊 Environment Comparison

| Feature | Development | Production |
|---------|-------------|------------|
| API URL | http://localhost:3001 | https://order-app-theta.vercel.app |
| Environment Indicator | ✅ Visible | ❌ Hidden |
| Hot Reload | ✅ Enabled | ❌ Disabled |
| Source Maps | ✅ Available | ❌ Minified |
| Debug Console | ✅ Verbose | ❌ Limited |
