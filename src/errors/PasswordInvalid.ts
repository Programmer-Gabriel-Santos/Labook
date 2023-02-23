import { BaseError } from "./BaseError";

export class PasswordInvalid extends BaseError {
    constructor(
        message: string = "Senha inválida." 
    ) {
        super(422, message)
    }
}