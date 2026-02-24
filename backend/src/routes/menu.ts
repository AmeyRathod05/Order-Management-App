import { Router } from 'express';
import { menuItems } from '../models/menu';

const router = Router();

// GET /api/menu - Get all menu items
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: menuItems,
      count: menuItems.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/menu/:id - Get menu item by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = menuItems.find(item => item.id === id);
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }
    
    res.json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
