import request from 'supertest';
import express from 'express';
import cors from 'cors';
import menuRoutes from '../routes/menu';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/menu', menuRoutes);

describe('Menu API', () => {
  describe('GET /api/menu', () => {
    it('should return all menu items', async () => {
      const response = await request(app)
        .get('/api/menu')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(8);
      
      // Check structure of first menu item
      const firstItem = response.body.data[0];
      expect(firstItem).toHaveProperty('id');
      expect(firstItem).toHaveProperty('name');
      expect(firstItem).toHaveProperty('description');
      expect(firstItem).toHaveProperty('price');
      expect(firstItem).toHaveProperty('image');
      expect(firstItem).toHaveProperty('category');
    });

    it('should return menu items with correct data types', async () => {
      const response = await request(app)
        .get('/api/menu')
        .expect(200);

      response.body.data.forEach((item: any) => {
        expect(typeof item.id).toBe('string');
        expect(typeof item.name).toBe('string');
        expect(typeof item.description).toBe('string');
        expect(typeof item.price).toBe('number');
        expect(typeof item.image).toBe('string');
        expect(typeof item.category).toBe('string');
        expect(item.price).toBeGreaterThan(0);
      });
    });
  });

  describe('GET /api/menu/:id', () => {
    it('should return a specific menu item by ID', async () => {
      const response = await request(app)
        .get('/api/menu/1')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id', '1');
      expect(response.body.data).toHaveProperty('name', 'Margherita Pizza');
    });

    it('should return 404 for non-existent menu item', async () => {
      const response = await request(app)
        .get('/api/menu/999')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Menu item not found');
    });
  });
});
