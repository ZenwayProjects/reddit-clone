import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as express from "express";
import { Request, Response } from "express";
import authRoutes from './routes/auth'
import trim from "./middleware/trim";


const app = express();
app.use(express.json())
app.use(trim)

app.get('/', (__, res)=> res.send('Hello world'))
app.use('/api/auth', authRoutes)


AppDataSource.initialize().then(async () => {

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")


}).catch(error => console.log(error))
app.listen(5000)