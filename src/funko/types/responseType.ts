import { funkoSchema } from "../schema/funkoSchema.js";

export type ResponseType = {
  success: boolean;
  funkoPops?: funkoSchema[];
  error?: string;
};
