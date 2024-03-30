import jwt from "jsonwebtoken";


export const jwtSign = (payload: object, expiresIn: string | number) => {
  return jwt.sign(payload, process.env.RSAPRIVATE, {
    algorithm: "RS256",
    expiresIn,
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded: any = jwt.verify(token, process.env.RSAPUBLIC);
    return { payload: decoded, expired: false };
  } catch (error: any) {
    return { expired: error.message.includes("jwt expired") };
  }
};
