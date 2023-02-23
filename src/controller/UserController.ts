import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { LoginInputDTO, SignupInputDTO } from "../models/User";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }
    signup = async (req: Request, res: Response) => {
        try {
            const input: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const response = await this.userBusiness.signup(input)

            res.status(201).send(response)

        } catch (error: unknown) {

            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado" })
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const input: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const response = await this.userBusiness.login(input)

            res.send(response)

        } catch (error: unknown) {

            if (error instanceof Error) {
                return res.status(400).send({ message: error.message})
            }

            res.status(500).send({ message: "Erro inesperado" })
        }
    }
}