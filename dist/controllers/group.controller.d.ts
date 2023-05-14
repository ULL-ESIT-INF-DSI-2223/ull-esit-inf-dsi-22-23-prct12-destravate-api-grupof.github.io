import { Request, Response } from 'express';
export declare const getGroups: (req: Request, res: Response) => Promise<void>;
export declare const getGroupById: (req: Request, res: Response) => Promise<void>;
export declare const createGroup: (req: Request, res: Response) => Promise<void>;
export declare const updateGroup: (req: Request, res: Response) => Promise<void>;
export declare const deleteGroup: (req: Request, res: Response) => Promise<void>;
export declare const addTrackToHistory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addUserToGroup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
