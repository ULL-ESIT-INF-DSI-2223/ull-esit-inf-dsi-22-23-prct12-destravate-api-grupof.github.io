import express from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser, addTrackToHistory } from '../controllers/user.controller.js';

const router = express.Router();

// Rutas para usuarios
router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.get('/user', getUserById);
router.post('/user', createUser);
router.patch('/user/:id', updateUser);
router.patch('/user', updateUser);
router.delete('/user/:id', deleteUser);
router.delete('/user', deleteUser);
router.patch('/user/:id/addTrack', addTrackToHistory)

export default router;
