export interface CreatePostInputDBDTO {
    id: string,
    content: string,
    user_id: string
}

export interface CreatePostInputDTO {
    content: string,
    token: string
}

export interface GetPostsInputDTO {
    token: string,
    limit: string,
    page: string
}

export interface GetInputDB {
    limit: number,
    offset: number
}

export interface GetPostsOutputDTO {
    posts: Post[]
}

export interface PostOutputDB {
    id: string,
    content: string,
    user_id: string
}

export interface DeletePostInput {
    token: string,
    id: string
}

export interface LikeInput {
    token: string,
    id: string
}

export interface likeInputDB{
    post_id: string,
    user_id: string
}

export interface LikeOutputDB{
    post_id: string,
    user_id: string
}

export interface DislikeInput{
    token: string,
    id: string
}

export interface DislikeInputDB{
    post_id: string,
    user_id: string
}

export class Post {
    constructor(
        private id: string,
        private content: string,
        private userId: string,
        private likes: number = 0
    ) { }

    static toPostModelDB = (posts: PostOutputDB[]) => {
        const newPosts = posts.map((post) => {
            return new Post(
                post.id,
                post.content,
                post.user_id
            )
        })
        return newPosts
    }

    static toPostModelLike = (posts: Post[]) => {
        const newPosts = posts.map((post) => {
            return {
                id: post.getId(),
                content: post.getContent(),
                userId: post.getUserId(),
                likes: post.getLikes()
            }
        })

        return newPosts
    }

    public getId = () => {
        return this.id
    }

    public getContent = () => {
        return this.content
    }

    public getUserId = () => {
        return this.userId
    }

    public getLikes = () => {
        return this.likes
    }

    public setContent = (newContent: string) => {
        this.content = newContent
    }

    public setLikes = (newLikes: number) => {
        this.likes = newLikes
    }
}
