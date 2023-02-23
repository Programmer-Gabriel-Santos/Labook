import { User, UserDB } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    static TABLE_USERS = "labook_users"

    public toUserDBModel = (user: User) => {
        const userDB: UserDB = {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        }
        
        return userDB
    }

    findByEmail = async(email: string): Promise<UserDB> =>{

        const userDB: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        .where({email})

        return userDB[0]
    }

    insertUser = async (user: User) =>{
        const userDB = this.toUserDBModel(user)

        await UserDatabase.connection(UserDatabase.TABLE_USERS)
        .insert(userDB)
    }
}