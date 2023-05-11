import express from 'express';
import { createChallenge, deleteChallenge, getChallengeById, getChallenges, updateChallenge } from '../controllers/challenge.controller.js';

const router = express.Router();

// Grupos para usuarios
router.get('/challenges', getChallenges);
router.get('/challenge/:id', getChallengeById);
router.get('/challenge', getChallengeById);
router.post('/challenge', createChallenge);
router.patch('/challenge/:id', updateChallenge);
router.patch('/challenge', updateChallenge);
router.delete('/challenge/:id', deleteChallenge);
router.delete('/challenge', deleteChallenge);

export default router;