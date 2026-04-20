const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/asyncHandler');
const { signToken } = require('../utils/jwt');
const { createUser, findUserByEmail } = require('../models/userModel');

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const normalizedName = typeof name === 'string' ? name.trim() : '';
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const allowedRoles = ['admin', 'customer'];
  const normalizedRole = allowedRoles.includes(role) ? role : 'customer';

  if (!normalizedName || !normalizedEmail || !password) {
    return res.status(400).json({ message: 'name, email and password are required' });
  }

  const existingUser = await findUserByEmail(normalizedEmail);
  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    name: normalizedName,
    email: normalizedEmail,
    password: hashedPassword,
    role: normalizedRole
  });

  const token = signToken({ id: user.id, email: user.email, role: user.role });

  return res.status(201).json({
    message: 'User registered successfully',
    user,
    token
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (!normalizedEmail || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  const user = await findUserByEmail(normalizedEmail);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });

  return res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  });
});

module.exports = {
  register,
  login
};
