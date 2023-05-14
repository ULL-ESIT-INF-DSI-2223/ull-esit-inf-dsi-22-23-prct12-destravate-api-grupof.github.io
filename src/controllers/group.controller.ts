import { Request, Response } from 'express';
import { groupModel } from '../models/groupSchema.js';
import { userModel } from '../models/userSchema.js';
import { trackModel } from '../models/trackSchema.js';
import { historyFunction, favoriteRoutes, groupClasificationUsers} from '../utils/functions.js';
import { Types, Schema } from 'mongoose';

// Obtener todas las Grupos
export const getGroups = async (req: Request, res: Response) => {
  try {
   
    const groups = await groupModel.find();
    res.status(200).json(groups);
    console.log('Grupos obtenidas correctamente');
  } catch (error : any) {
    res.status(500).json({ message: error.message });
    console.log('Error al obtener los grupos');
  }
};

// Obtener una Grupo por su ID
export const getGroupById = async (req: Request, res: Response) => {
  console.log(req.params)
  try {
    const query = req.query;
    if (query && query.id) {
      const Group = await groupModel.findOne({ id: query.id }).populate('participants.user', 'name').populate('historicTracks.track');
      if (!Group) {
        res.status(404).json({ message: 'Grupo no encontrado' });
      } else {
      const favTracks = favoriteRoutes(Group.historicTracks);
      const stats = historyFunction(Group.historicTracks);
      const rankingusers = groupClasificationUsers(Group.participants, Group.historicTracks)
        res.status(200).json({Group, stats:{"km semanales": stats[0],"Desnivel semanal": stats[1], "km mensuales": stats[2],"Desnivel mensual": stats[3], "km anuales": stats[4], "Desnivel anual": stats[5]}, favTracks, rankingusers});
      }
    } else {
      const { id } = req.params;
      const Group = await groupModel.findById(id).populate('participants.user', 'name').populate('historicTracks.track');
      if (!Group) {
        res.status(404).json({ message: 'Grupo no encontrado' });
      } else {
        const favTracks = favoriteRoutes(Group.historicTracks);
        const stats = historyFunction(Group.historicTracks);
        const rankingusers = groupClasificationUsers(Group.participants, Group.historicTracks)
        res.status(200).json({Group, stats:{"km semanales": stats[0],"Desnivel semanal": stats[1], "km mensuales": stats[2],"Desnivel mensual": stats[3], "km anuales": stats[4], "Desnivel anual": stats[5]}, favTracks, rankingusers});      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva Grupo
export const createGroup = async (req: Request, res: Response) => {
  try {
    const group = new groupModel(req.body);
    await group.save();
    res.status(200).json({ message: 'Grupo creado correctamente' , group });
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una Grupo existente
export const updateGroup = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Group = await groupModel.findOneAndUpdate({ id: query.id }, req.body, { new: true });
      if (!Group) {
        res.status(404).json({ message: 'Grupo no encontrado' });
      } else {
        res.status(200).json({ message: 'Grupo actualizado correctamente' });
      }
    } else {
      const { id } = req.params;
      const Group = await groupModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!Group) {
        res.status(404).json({ message: 'Grupo no encontrado' });
      } else {
        res.status(200).json({ message: 'Grupo actualizado correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una Grupo existente
export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Group = await groupModel.findOneAndDelete({ id: query.id });
      if (!Group) {
        res.status(404).json({ message: 'Grupo no encontrado' });
      } else {
        res.status(200).json({ message: 'Grupo borrado correctamente' });
      }
    } else {
      const { id } = req.params;
      const Group = await groupModel.findByIdAndDelete(id);
      if (!Group) {
        res.status(404).json({ message: 'Grupo no encontrado' });
      } else {
        res.status(200).json({ message: 'Grupo borrado correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

export const addTrackToHistory = async (req: Request, res: Response) => {
  try {
    const groupId = req.params.id;
    const { date, track } = req.body; // Asegúrate de que el cuerpo de la petición incluye la fecha y el ID de la pista
    // Encuentra el usuario y actualiza su array historicTracks
    const group = await groupModel.findByIdAndUpdate(
      groupId, 
      { $push: { historicTracks: { date: new Date(date), track: track } } }, 
      { new: true, useFindAndModify: false } // new: true para devolver el documento actualizado, useFindAndModify: false para utilizar el método findOneAndUpdate de Mongoose en lugar del método findAndModify de MongoDB
    );

    if (!group) {
      return res.status(404).send('group not found');
    }

    return res.send(group);

  } catch (error) {
    return res.status(500).send('Server error');
  }
};

export const addUserToGroup = async (req: Request, res: Response) => {
  try {
    const groupId = req.params.id;
    const { date, user } = req.body; // Asegúrate de que el cuerpo de la petición incluye la fecha y el ID de la pista
    // Encuentra el usuario y actualiza su array historicTracks
    const group = await groupModel.findByIdAndUpdate(
      groupId, 
      { $push: { participants: { date: new Date(date), user: user } } }, 
      { new: true, useFindAndModify: false } // new: true para devolver el documento actualizado, useFindAndModify: false para utilizar el método findOneAndUpdate de Mongoose en lugar del método findAndModify de MongoDB
    );

    if (!group) {
      return res.status(404).send('group not found');
    }

    return res.send(group);

  } catch (error) {
    return res.status(500).send('Server error');
  }
};