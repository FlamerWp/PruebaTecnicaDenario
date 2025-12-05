const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    if (!contraseña || contraseña.length < 5) {
        return res.status(400).json({ error: 'La contraseña debe tener mínimo 5 caracteres' });
    }

    const existing = await User.findByEmail(correo);
    if (existing) return res.status(400).json({ error: 'El correo ya está registrado' });

    const hash = await bcrypt.hash(contraseña, 10);
    const newUser = await User.createUser(nombre, correo, hash);
    res.status(201).json(newUser);
};

exports.login = async (req, res) => {
    const { correo, contraseña } = req.body;
    const user = await User.findByEmail(correo);

    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(contraseña, user.Contraseña);
    if (!valid) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.IdUser }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token }); 
};
