
import jwt from 'jsonwebtoken';
import fs from 'fs'
import path from 'path'
const dirname = './././'
const privateKey = fs.readFileSync(path.join(dirname, 'keys', 'rsa.key'), 'utf8')
const publicKey = fs.readFileSync(path.join(dirname, 'keys', 'rsa.key.pub'), 'utf8')


export const jwtSign = (payload: Object, expiresIn: string | number) => {
    return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn });
};

export const verifyJwt = (token: string) => {
    try {
        const decoded:any = jwt.verify(token, publicKey);
        return { payload: decoded, expired: false };
    } catch (error: any) {
        return { expired: error.message.includes('jwt expired') };
    }
};
