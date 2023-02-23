import { CreatePostInputDBDTO, DislikeInputDB, GetInputDB, likeInputDB, LikeOutputDB, Post, PostOutputDB } from "../models/Post"
import { BaseDatabase } from "./BaseDatabase"

export class PostDatabase extends BaseDatabase {
    TABLE_POSTS = "labook_posts"
    TABLE_LIKES = "labook_likes"


    insertPost = async (input: CreatePostInputDBDTO) => {
        await PostDatabase.connection(this.TABLE_POSTS)
            .insert(input)
    }

    selectPosts = async (input: GetInputDB) => {
        const posts: PostOutputDB[] = await PostDatabase
            .connection(this.TABLE_POSTS)
            .limit(input.limit)
            .offset(input.offset)

        return posts && Post.toPostModelDB(posts)
    }

    selectLikes = async (post_id: string) => {
        const result = await BaseDatabase
            .connection(this.TABLE_LIKES)
            .count("post_id AS likes")
            .where({ post_id })

        return result[0].likes as number
    }

    findPostById = async (id: string) => {

        const post: PostOutputDB[] = await BaseDatabase
            .connection(this.TABLE_POSTS)
            .select()
            .where({ id })

        return post[0]
    }

    deletePost = async (id: string) => {
        await BaseDatabase
            .connection(this.TABLE_POSTS)
            .delete()
            .where({ id })
    }

    findLikeById = async (post_id: string, user_id: string) => {
        const result: LikeOutputDB[] = await BaseDatabase
            .connection(this.TABLE_LIKES)
            .where({ post_id, user_id })

        return result[0]
    }

    insertLike = async (input: likeInputDB) => {
        await BaseDatabase
            .connection(this.TABLE_LIKES)
            .insert(input)
    }

    deleteAllLikes = async(id: string) =>{
        await BaseDatabase
        .connection(this.TABLE_LIKES)
        .delete()
        .where({post_id: id})
    }

    deleteLike = async (input: DislikeInputDB) => {
        await BaseDatabase
            .connection(this.TABLE_LIKES)
            .delete()
            .where({
                post_id: input.post_id,
                user_id: input.user_id
            })
    }
}