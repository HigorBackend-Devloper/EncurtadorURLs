import { randomBytes } from "node:crypto";

function generateCode(){
    const codigo = randomBytes(4).toString("hex");
    return codigo;
}

export default generateCode
