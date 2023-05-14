import express from 'express';
import { createTrack, deleteTrack, getTrackById, getTracks, updateTrack } from '../controllers/track.controller.js';
const router = express.Router();
// Rutas para usuarios
router.get('/tracks', getTracks);
router.get('/track/:id', getTrackById);
router.get('/track', getTrackById);
router.post('/track', createTrack);
router.patch('/track/:id', updateTrack);
router.patch('/track', updateTrack);
router.delete('/track/:id', deleteTrack);
router.delete('/track', deleteTrack);
export default router;
