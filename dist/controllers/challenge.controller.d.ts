import { Request, Response } from 'express';
export declare const getChallenges: (req: Request, res: Response) => Promise<void>;
export declare const getChallengeById: (req: Request, res: Response) => Promise<void>;
export declare const createChallenge: (req: Request, res: Response) => Promise<void>;
export declare const updateChallenge: (req: Request, res: Response) => Promise<void>;
export declare const deleteChallenge: (req: Request, res: Response) => Promise<void>;
