import { Request, Response } from 'express';
import { groupModel } from '../models/groupSchema.js';

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
  try {
    const query = req.query;
    if (query && query.id) {
      const Group = await groupModel.findOne({ id: query.id });
      if (!Group) {
        res.status(404).json({ message: 'Grupo no encontrado' });
      } else {
        res.status(200).json(Group);
      }
    } else {
      const { id } = req.params;
      const Group = await groupModel.findById(id);
      if (!Group) {
        res.status(404).json({ message: 'Grupo no encontrado' });
      } else {
        res.status(200).json(Group);
      }
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