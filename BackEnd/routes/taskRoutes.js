const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const db = require("../config/db");

// Crear nueva tarea
router.post("/", auth, async (req, res) => {
    const { descripcion, estado } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO TASKS (IdUser, Descripcion, Estado) VALUES (?, ?, ?)",
            [req.userId, descripcion, estado || "Pendiente"]
        );
        res.status(201).json({ id: result.insertId, descripcion, estado });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar una tarea
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'DELETE FROM TASKS WHERE IdTask = ? AND IdUser = ?',
      [id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada o no pertenece al usuario' });
    }

    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar estado de una tarea
router.put('/:id', auth, async (req, res) => {
  const { estado } = req.body; // "Pendiente" o "Completa"
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'UPDATE TASKS SET Estado = ?, FechaModificacion = NOW() WHERE IdTask = ? AND IdUser = ?',
      [estado, id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada o no pertenece al usuario' });
    }

    res.json({ message: 'Estado actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Visualizar tareas pendientes
router.get("/pendientes", auth, async (req, res) => {
    const [rows] = await db.query(
        'SELECT * FROM TASKS WHERE IdUser = ? AND Estado = "Pendiente"',
        [req.userId]
    );
    res.json(rows);
});

// Visualizar tareas completas
router.get("/completas", auth, async (req, res) => {
    const [rows] = await db.query(
        'SELECT * FROM TASKS WHERE IdUser = ? AND Estado = "Completa"',
        [req.userId]
    );
    res.json(rows);
});

module.exports = router;
