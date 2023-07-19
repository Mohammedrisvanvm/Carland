import jwt from 'jsonwebtoken'


const privateKey=`qwerty`
const publicKey=`ytrewq`

export const jwtSign=(payload:object,expiresIn:string | number)=>{
  return  jwt.sign(payload,privateKey,{algorithm:'RS256',expiresIn})
}

export const verifyJwt=(token:string)=>{
    try {
        
        const decoded=jwt.verify(token,publicKey)
        return {payload:decoded,expiresIn:false}
    } catch (error:any) {
        return {payload:null,expiresIn:error.message.include('jwt expired')}
        
    }
}