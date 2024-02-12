import { Request, Response, Router } from "express";
import { User } from "../entity/User";

import { validate} from 'class-validator'

const register = async (req: Request, res: Response) => {
    const{email, username, password} = req.body

    try {
        //validar datos
        let errors: any = {}
        const emailUser = await User.findOne({where:{email}})
        const usernameUser = await User.findOne({where:{username}})

        if(emailUser) errors.email = 'Email already taken'
        if(usernameUser)errors.username = 'username already taken'

        if(Object.keys(errors).length > 0){
            return res.status(400).json(errors)
        }

        
        //crear usuario

        const user = User.create({username, email, password})

        errors = await validate(user)
        if(errors.length > 0){
            return res.status(400).json({errors})
        }

        await user.save()
        //return usuario
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const router = Router()
router.post('/register', register)

export default router