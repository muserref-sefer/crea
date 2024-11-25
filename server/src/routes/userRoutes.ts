import express from 'express';
import { login } from '../controllers/UserController';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const { token, user } = await login(username, password);
    res.status(200).json({ token, user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }  
  }
});

export default router;