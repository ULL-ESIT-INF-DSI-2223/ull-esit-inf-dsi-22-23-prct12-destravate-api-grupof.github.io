import express from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

// Rutas para usuarios
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
