import { Request, Response } from "express";
import {JwtPayload} from 'jsonwebtoken'
interface DecodedToken extends JwtPayload {
    sessionId:any
    email:string,
    valid:boolean,
    name:string
  }



  export const sessions: Record<string, { sessionId: string; email: string; valid: boolean }> = {};

  export function createSession(email: string, name: string) {
    const sessionId = String(Object.keys(sessions).length + 1);
  
    const session: DecodedToken = { sessionId, email, valid: true, name };
    sessions[session.sessionId] = session;
  
    return session;
  }

  
export function getSession(sessionId: string) {
    const session = sessions[sessionId];
  
    return session && session.valid ? session : null;
  }
  
  export function invalidateSession (sessionId: string) {
    const session = sessions [sessionId];
    if (session) {
    sessions [sessionId].valid = false;
    }
    return sessions [sessionId];
    }