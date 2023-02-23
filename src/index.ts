import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import { userRouter } from './router/userRouter'
import { postRouter } from './router/postRouter'
import { AddressInfo } from 'net'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});

app.use("/users", userRouter)

app.use("/posts", postRouter)
