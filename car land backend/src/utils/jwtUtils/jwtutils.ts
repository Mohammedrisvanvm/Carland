import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
const dirname = "./././";
// const privateKey = fs.readFileSync(
//   path.join(dirname, "keys", "rsa.key"),
//   "utf8"
// );
// // const publicKey = fs.readFileSync(path.join(__dirname, 'keys', 'rsa.key.pub'), 'utf8')
// const publicKey = fs.readFileSync(path.join(__dirname), "utf-8");
// console.log(publicKey);

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
