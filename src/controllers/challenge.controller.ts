import { Request, Response } from 'express';
import { challengeModel } from '../models/challengeSchema.js';
import { challengeLongAndUnevennes } from '../utils/functions.js';

// Obtener todos los Retos
export const getChallenges = async (req: Request, res: Response) => {
  try {

    const challenges = await challengeModel.find().populate('tracks');
    //Añadir a cada challenge la distancia total de sus tracks y el desnivel medio
    const challengesfinal = challengeLongAndUnevennes(challenges);
    res.status(200).json(challengesfinal);
    console.log('Retos obtenidos correctamente');
  } catch (error : any) {
    res.status(500).json({ message: error.message });
    console.log('Error al obtener los retos');
  }
};

// Obtener una Reto por su ID
export const getChallengeById = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Challenge = await challengeModel.findOne({ id: query.id }).populate('tracks');
      if (!Challenge) {
        res.status(404).json({ message: 'Reto no encontrado' });
      } else {
        const challengesfinal = challengeLongAndUnevennes([Challenge]);
        res.status(200).json(challengesfinal);
      }
    } else {
      const { id } = req.params;
      const Challenge = await challengeModel.findById(id).populate('tracks');
      if (!Challenge) {
        res.status(404).json({ message: 'Reto no encontrado' });
      } else {
        const challengesfinal = challengeLongAndUnevennes([Challenge]);
        res.status(200).json(challengesfinal);
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva Reto
export const createChallenge = async (req: Request, res: Response) => {
  try {
    const challenge = new challengeModel(req.body);
    await challenge.save();
    res.status(200).json({ message: 'Reto creado correctamente' , challenge });
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una Reto existente
export const updateChallenge = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Challenge = await challengeModel.findOneAndUpdate({ id: query.id }, req.body, { new: true });
      if (!Challenge) {
        res.status(404).json({ message: 'Reto no encontrado' });
      } else {
        res.status(200).json({ message: 'Reto actualizado correctamente' });
      }
    } else {
      const { id } = req.params;
      const Challenge = await challengeModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!Challenge) {
        res.status(404).json({ message: 'Reto no encontrado' });
      } else {
        res.status(200).json({ message: 'Reto actualizado correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una Reto existente
export const deleteChallenge = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Challenge = await challengeModel.findOneAndDelete({ id: query.id });
      if (!Challenge) {
        res.status(404).json({ message: 'Reto no encontrado' });
      } else {
        res.status(200).json({ message: 'Reto borrado correctamente' });
      }
    } else {
      const { id } = req.params;
      const Challenge = await challengeModel.findByIdAndDelete(id);
      if (!Challenge) {
        res.status(404).json({ message: 'Reto no encontrado' });
      } else {
        res.status(200).json({ message: 'Reto borrado correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};