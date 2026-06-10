import { Op } from 'sequelize';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const loginIdentifier = String(email || name || '').trim();
    const cleanPassword = String(password || '').trim();

    const user = await User.findOne({ 
      where: { 
        [Op.or]: [
          { email: loginIdentifier },
          { name: loginIdentifier }
        ]
      } 
    });

    if (user && (await user.matchPassword(cleanPassword))) {
      res.json({
        _id: user.id, // Keep _id in API response for frontend compatibility
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      console.log(`Login failure for: ${loginIdentifier}`);
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Auth Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!(await user.matchPassword(currentPassword))) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully', token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { authUser, registerUser, updatePassword };
