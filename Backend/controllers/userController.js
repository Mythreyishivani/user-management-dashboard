const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// GET all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, phone, company, address } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone: phone || 'N/A', // default if not provided
            company: company || null,
            address: address || null, // address should be JSON: {street, city, zipcode, geo:{lat,lng}}
        });

        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            company: newUser.company,
            address: newUser.address,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT update user
exports.updateUser = async (req, res) => {
    try {
        const { name, email, phone, company, address } = req.body;

        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update({
            name: name || user.name,
            email: email || user.email,
            phone: phone || user.phone,
            company: company || user.company,
            address: address || user.address
        });

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            company: user.company,
            address: user.address,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
