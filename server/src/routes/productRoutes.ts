import express from 'express';
import { addReview, getAllProducts, getProductById } from '../controllers/ProductController';

const router = express.Router();

router.get('/list', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(404).json({ error: 'An unknown error occurred' });
    }
  }
});

router.post('/:id/review', async (req, res) => {
  try {
    const { id } = req.params; 
    const { user, review, rating } = req.body;

    const updatedProduct = await addReview(id, { user, review, rating });
    res.status(201).json(updatedProduct);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }  }
});

export default router;