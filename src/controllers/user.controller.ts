import { Request, Response } from 'express';
import { userModel } from '../models/userSchema.js';
import { historyFunction, favoriteRoutes } from '../utils/historyFunctions.js';
import mongoose from 'mongoose';

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
      const users = await userModel.find().populate('friends', 'name').populate('historicTracks', 'name');
      res.status(200).json(users);
      console.log('Usuarios obtenidos correctamente');
    } catch (error : any) {
    res.status(500).json({ message: error.message });
    console.log('Error al obtener los usuarios');
  }
};

// Obtener un usuario por su ID o por nombre
export const getUserById = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const user = await userModel.findOne({ id: query.id }).populate('friends', 'name').populate('historicTracks.track');
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        
        const stats = historyFunction(user.historicTracks);
        const favTracks = favoriteRoutes(user.historicTracks);
        res.status(200).json({user: user, stats:{"km semanales": stats[0],"Desnivel semanal": stats[1], "km mensuales": stats[2],"Desnivel mensual": stats[3], "km anuales": stats[4], "Desnivel anual": stats[5]}, favTracks});
      }
    } else {
      const { id } = req.params;
      const user = await userModel.findById(id).populate('friends', 'name').populate('historicTracks', 'name');
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        const stats = historyFunction(user.historicTracks);
        console.log(stats)
        res.status(200).json(user);
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(200).json({ message: 'Usuario creado correctamente', user });
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario existente
export const updateUser = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const user = await userModel.findOneAndUpdate({ id: query.id }, req.body, { new: true });
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
      }
    } else {
      const { id } = req.params;
      const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario existente
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const user = await userModel.findOneAndDelete({ id: query.id });
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario borrado correctamente' });
      }
    } else {
      const { id } = req.params;
      const user = await userModel.findByIdAndDelete(id);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario borrado correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

export const addTrackToHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { date, track } = req.body; // Asegúrate de que el cuerpo de la petición incluye la fecha y el ID de la pista
    // Encuentra el usuario y actualiza su array historicTracks
    const user = await userModel.findByIdAndUpdate(
      userId, 
      { $push: { historicTracks: { date: new Date(date), track: track } } }, 
      { new: true, useFindAndModify: false } // new: true para devolver el documento actualizado, useFindAndModify: false para utilizar el método findOneAndUpdate de Mongoose en lugar del método findAndModify de MongoDB
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    return res.send(user);

  } catch (error) {
    return res.status(500).send('Server error');
  }
};
