const db = require('../config/db');

module.exports = {
    async createUser(nombre, correo, contraseñaHash) {
        const [result] = await db.query(
            'INSERT INTO USERS (Nombre, Correo, Contraseña) VALUES (?, ?, ?)',
            [nombre, correo, contraseñaHash]
        );
        return { id: result.insertId, nombre, correo };
    },

    async findByEmail(correo) {
        const [rows] = await db.query(
            'SELECT * FROM USERS WHERE Correo = ?',
            [correo]
        );
        return rows[0];
    },

    async findById(id) {
        const [rows] = await db.query(
            'SELECT * FROM USERS WHERE IdUser = ?',
            [id]
        );
        return rows[0];
    }
};
