import express from 'express';
import { createGroup, deleteGroup, getGroupById, getGroups, updateGroup, addTrackToHistory, addUserToGroup} from '../controllers/group.controller.js';

const router = express.Router();

// Grupos para usuarios
router.get('/groups', getGroups);
router.get('/group/:id', getGroupById);
router.get('/group', getGroupById);
router.post('/group', createGroup);
router.patch('/group/:id', updateGroup);
router.patch('/group', updateGroup);
router.patch('/group/:id/addUser', addUserToGroup)
router.patch('/group/:id/addTrack', addTrackToHistory)
router.delete('/group/:id', deleteGroup);
router.delete('/group', deleteGroup);

export default router;