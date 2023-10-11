import { hash, compare } from "bcrypt";

export function encryptPassword (password: string) {
    const encryptedPassword = hash(password, 16);
    return encryptedPassword;
}

export function verifyPassword (literalPassword: string, hashedPassword: string) {
    const isValid = compare(literalPassword, hashedPassword);
    return isValid;
}
