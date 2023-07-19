import { Request, Response } from "express";


export const sessions: Record<
    string,
    { sessionId: string; email: string; valid: boolean }
> = {};

export function createSession(
    email: string, name: String) {

    const sessionId = String(Object.keys(sessions).length + 1);

    const session = { sessionId, email, valid: true, name };

    sessions[sessionId] = session;

    return session;

}