import { Request, Response } from 'express';
import { trackModel } from '../models/trackSchema.js';

// Obtener todas las Rutas

/**
 * Función que obtiene todas las rutas de la base de datos
 * @param req
 * @param res
 */
export const getTracks = async (req: Request, res: Response) => {
  try {
    const tracks = await trackModel.find();
    res.status(200).json(tracks);
    console.log('Rutas obtenidas correctamente');
  } catch (error : any) {
    res.status(500).json({ message: error.message });
    console.log('Error al obtener las rutas');
  }
};

// Obtener una Ruta por su IDç

/**
 * Función que obtiene una ruta por su id
 * @param req
 * @param res
 */
export const getTrackById = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Track = await trackModel.findOne({ id: query.id });
      if (!Track) {
        res.status(404).json({ message: 'Ruta no encontrada' });
      } else {
        res.status(200).json(Track);
      }
    } else {
      const { id } = req.params;
      const Track = await trackModel.findById(id);
      if (!Track) {
        res.status(404).json({ message: 'Ruta no encontrada' });
      } else {
        res.status(200).json(Track);
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva Ruta

/**
 * Función que crea una nueva ruta
 * @param req
 * @param res
 */
export const createTrack = async (req: Request, res: Response) => {
  try {
    const track = new trackModel(req.body);
    await track.save();
    res.status(200).json({ message: 'Ruta creada correctamente' , track });
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una Ruta existente

/**
 * Función que actualiza una ruta existente
 * @param req
 * @param res
 */
export const updateTrack = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Track = await trackModel.findOneAndUpdate({ id: query.id }, req.body, { new: true });
      if (!Track) {
        res.status(404).json({ message: 'Ruta no encontrada' });
      } else {
        res.status(200).json({ message: 'Ruta actualizada correctamente' });
      }
    } else {
      const { id } = req.params;
      const Track = await trackModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!Track) {
        res.status(404).json({ message: 'Ruta no encontrada' });
      } else {
        res.status(200).json({ message: 'Ruta actualizada correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una Ruta existente

/**
 * Función que elimina una ruta existente
 * @param req
 * @param res
 */
export const deleteTrack = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Track = await trackModel.findOneAndDelete({ id: query.id });
      if (!Track) {
        res.status(404).json({ message: 'Ruta no encontrada' });
      } else {
        res.status(200).json({ message: 'Ruta borrada correctamente' });
      }
    } else {
      const { id } = req.params;
      const Track = await trackModel.findByIdAndDelete(id);
      if (!Track) {
        res.status(404).json({ message: 'Ruta no encontrada' });
      } else {
        res.status(200).json({ message: 'Ruta borrada correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};