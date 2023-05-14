import { Request, Response } from 'express';
export declare const getTracks: (req: Request, res: Response) => Promise<void>;
export declare const getTrackById: (req: Request, res: Response) => Promise<void>;
export declare const createTrack: (req: Request, res: Response) => Promise<void>;
export declare const updateTrack: (req: Request, res: Response) => Promise<void>;
export declare const deleteTrack: (req: Request, res: Response) => Promise<void>;
