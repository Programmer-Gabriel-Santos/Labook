import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
    constructor(
        message: string = "Recurso já utilizado" 
    ) {
        super(409, message)
    }
}