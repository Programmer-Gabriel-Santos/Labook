import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { CreatePostInputDTO, DislikeInput, DeletePostInput, GetPostsInputDTO, LikeInput } from "../models/Post";

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    createPost = async (req: Request, res: Response) => {
        try {
            const input: CreatePostInputDTO = {
                content: req.body.content,
                token: req.headers.authorization as string
            }

            const response = await this.postBusiness.createPost(input)

            res.status(201).send(response)

        } catch (error: unknown) {

            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado" })
        }
    }

    getPosts = async (req: Request, res: Response) => {
        try {
            const input: GetPostsInputDTO = {
                token: req.headers.authorization as string,
                limit: req.query.limit as string,
                page: req.query.page as string
            }

            const posts = await this.postBusiness.getPosts(input)

            res.send(posts)

        } catch (error: unknown) {

            if (error instanceof Error) {

                return res.status(400).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado" })
        }
    }

    deletePost = async (req: Request, res: Response) => {
        try {
            const input: DeletePostInput = {
                token: req.headers.authorization as string,
                id: req.params.id
            }

            const response = await this.postBusiness.deletePost(input)

            res.send(response)

        } catch (error: unknown) {

            if (error instanceof Error) {

                return res.status(400).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado" })
        }
    }

    likePost = async (req: Request, res: Response) => {
        try {
            const input: LikeInput = {

                token: req.headers.authorization as string,
                id: req.params.id
            }

            const response = await this.postBusiness.likePost(input)

            res.send(response)

        } catch (error: unknown) {

            if (error instanceof Error) {

                return res.status(400).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado" })
        }

    }

    deleteLike = async (req: Request, res: Response) => {

        try {
            const input: DislikeInput = {
                token: req.headers.authorization as string,
                id: req.params.id
            }

            const response = await this.postBusiness.deleteLike(input)
            
            res.send(response)

        } catch (error: unknown) {
            
            if (error instanceof Error) {

                return res.status(400).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado" })
        }
    }
}