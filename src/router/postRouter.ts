import { Router } from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { PostController } from '../controller/PostController'
import { PostDatabase } from '../database/PostDatabase'
import { Authenticator } from '../services/Authenticator'
import { IdGenerator } from '../services/IdGenerator'

export const postRouter = Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new Authenticator()
    )
)

postRouter.get("/", postController.getPosts)

postRouter.post("/", postController.createPost)

postRouter.post("/like/:id", postController.likePost)

postRouter.delete("/like/:id", postController.deleteLike)

postRouter.delete("/:id", postController.deletePost)


