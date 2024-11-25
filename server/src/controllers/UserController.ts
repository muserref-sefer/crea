import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const login = async (username: string, password: string) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Password is wrong.');
    }

    const token = jwt.sign(
      { id: user._id, username: user.name },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );

    return {
      token,
      user: {
        id: user._id,
        username: user.name,
        email: user.email,
      },
    };
  } catch (error:any) {
    throw new Error(error.message || 'An error occurred.');
  }
};