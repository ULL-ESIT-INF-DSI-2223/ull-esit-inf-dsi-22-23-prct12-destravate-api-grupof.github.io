import { Request, Response } from 'express';
import { userModel } from '../models/userSchema.js';

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
      const users = await userModel.find().populate('friends', 'name');
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
      const user = await userModel.findOne({ id: query.id });
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json(user);
      }
    } else {
      const { id } = req.params;
      const user = await userModel.findById(id);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
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
