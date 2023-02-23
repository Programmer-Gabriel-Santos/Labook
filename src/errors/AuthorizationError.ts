import { BaseError } from "./BaseError";

export class AuthorizationError extends BaseError {
    constructor(
        message: string = "Você não possui permissão para executar esta ação." 
    ) {
        super(403, message)
    }
}