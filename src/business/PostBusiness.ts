import { PostDatabase } from "../database/PostDatabase"
import { AuthenticationError } from "../errors/AuthenticationError"
import { AuthorizationError } from "../errors/AuthorizationError"
import { ConflictError } from "../errors/ConflictError"
import { ParamsError } from "../errors/ParamsError"
import { CreatePostInputDBDTO, CreatePostInputDTO, DeletePostInput, DislikeInputDB, GetInputDB, GetPostsInputDTO, GetPostsOutputDTO, LikeInput, likeInputDB } from "../models/Post"
import { USER_ROLES } from "../models/User"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) {}

    createPost = async(input: CreatePostInputDTO) =>{
        
        const token = input.token as string
        const content = input.content as string

        if(!token || !content){
            throw new ParamsError()
        }

        if(content.length < 5){
            throw new ParamsError()
        }

        const payload = this.authenticator.getTokenPayload(token)

        if(!payload){
            throw new AuthenticationError()
        }

        const id = this.idGenerator.generate()
        const user_id = payload.id

        const post: CreatePostInputDBDTO = {
            id,
            content,
            user_id
        }

        await this.postDatabase.insertPost(post)

        const response = {message: "Post publicado com sucesso!"}

        return response
    }

    getPosts = async(input: GetPostsInputDTO) =>{
        const token = input.token
        const limit = Number(input.limit) || 20
        const page = Number(input.page) || 1

        const offset = limit * (page -1)

        const inputGetDB: GetInputDB = {
            limit,
            offset
        }

        if(!token){
            throw new ParamsError()
        }

        const payload = this.authenticator.getTokenPayload(token)

        if(!payload){
            throw new AuthenticationError()
        }

        const postsDB = await this.postDatabase.selectPosts(inputGetDB)

        for(let post of postsDB){
            const postId = post.getId()
            const qtdLikes = await this.postDatabase.selectLikes(postId)

            post.setLikes(qtdLikes)
        }
        
        const response: GetPostsOutputDTO ={
            posts: postsDB
        }

        return response
    }

    deletePost = async(input: DeletePostInput) =>{
        const {token, id} = input

        if(!token || !id){
            throw new ParamsError()
        }

        const payload = this.authenticator.getTokenPayload(token)

        if(!payload){
            throw new AuthenticationError()
        }

        const post = await this.postDatabase.findPostById(id)

        if(!post){
            throw new Error("Post não encontrado")
        }

        if(payload.role === USER_ROLES.NORMAL && payload.id !== post.user_id){
            throw new AuthorizationError()
        }

        await this.postDatabase.deleteAllLikes(id)

        await this.postDatabase.deletePost(id)

        const response = {
            message: "Post deletado com sucesso!"
        }

        return response
    }

    likePost = async(input: LikeInput) =>{
        const {token, id} = input

        if(!token || !id){
            throw new ParamsError()
        }

        const payload = this.authenticator.getTokenPayload(token)

        if(!payload){
            throw new AuthenticationError()
        }

        const post = await this.postDatabase.findPostById(id)

        if(!post){
            throw new ParamsError()
        }

        const isLike = await this.postDatabase.findLikeById(id,payload.id)

        if(isLike){
            throw new ConflictError()
        }

        const inputLikeDB: likeInputDB = {
            post_id: id,
            user_id: payload.id
        }

        await this.postDatabase.insertLike(inputLikeDB)

        const response = {message: "Curtido com sucesso!"}

        return response
    }

    deleteLike = async(input: DeletePostInput) =>{
        const {token, id} = input

        if(!token || !id){
            throw new ParamsError()
        }

        const payload = this.authenticator.getTokenPayload(token)

        if(!payload){
            throw new AuthenticationError()
        }

        const inputDB: DislikeInputDB = {
            post_id: id,
            user_id: payload.id
        }

        const isLike = await this.postDatabase.findLikeById(id,payload.id)

        if(!isLike){
            throw new Error("Você ainda não curtiu essa publicação")
        }
        
        await this.postDatabase.deleteLike(inputDB)

        const response = {message: "Post descurtido"}
    
        return response
    }
}