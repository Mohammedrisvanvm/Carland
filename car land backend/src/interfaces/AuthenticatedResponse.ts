import { Response } from "express";

export interface AuthenticatedResponse extends Response {
    status(code: number): this; 
  
}
