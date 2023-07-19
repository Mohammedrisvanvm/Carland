// import jwt from 'jsonwebtoken'
// import crypto from 'node:crypto'

// const privateKey=`-----BEGIN RSA PRIVATE KEY-----
// MIIBIjANBgkqhkiG9w0qwertyBAQEFAAOCAQ8AMIIBCgKCAQEA75DWT6M1A8B96xW8ovjN
// -----END RSA PRIVATE KEY-----`
// const publicKey=`
// -----END RSA PUBLIC KEY-----
// MIIEpAIBAAKCAQEA75DWTytrewq6M1A8B96xW8ovjN6Q0UUsnKhxh3LPu5FLSuLuvjqbKg
// -----END RSA PUBLIC KEY-----`
// const privateKeyObj=crypto.createPrivateKey(privateKey)
// const publicKeyObj=crypto.createPrivateKey(publicKey)



// export const jwtSign=(payload:object,expiresIn:string | number)=>{
    
//   return  jwt.sign(payload,privateKey2,{algorithm:'RS256',expiresIn})
// }

// export const verifyJwt=(token:string)=>{
//     try {
        
//         const decoded=jwt.verify(token,publicKey2)
//         return {payload:decoded,expiresIn:false}
//     } catch (error:any) {
//         return {payload:null,expiresIn:error.message.include('jwt expired')}
        
//     }
// }
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA75DWT6M1A8B96xW8ovjNqwerty
 -----END RSA PRIVATE KEY-----`;

const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIEpAIBAAKCAQEA75DWTytrewq6M1A8B96xW8ovjN6Q0UUsnKhxh3LPu5FLSuLuvjqbKgytrewq
-----END RSA PUBLIC KEY-----`;

const privateKeyObj = crypto.createPrivateKey(privateKey);
const publicKeyObj = crypto.createPublicKey(publicKey);

export const jwtSign = (payload: object, expiresIn: string | number) => {
  return jwt.sign(payload, privateKeyObj, { algorithm: 'RS256', expiresIn });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKeyObj);
    return { payload: decoded, expiresIn: false };
  } catch (error: any) {
    return { payload: null, expiresIn: error.message.includes('jwt expired') };
  }
};
