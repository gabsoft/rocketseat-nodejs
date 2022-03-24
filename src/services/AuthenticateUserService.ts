import { getCustomRepository } from "typeorm"
import { UsersRepostitories } from "../repositories/UsersRepositories"

import { sign } from "jsonwebtoken"

import { compare } from 'bcryptjs'

interface IAuthenticateRequest {
    email: string,
    password: string
}

class AuthenticateUserService {
    async execute({ email, password } : IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepostitories)

        const user = await usersRepositories.findOne({
            email
        })

        if(!user) {
            throw new Error('Email/Password incorrect')
        }

       const passwordMatch = await compare(password, user.password)
       
       if(!passwordMatch){
           throw new Error('Email/Password incorrect')
       }

       const token = sign({
           email: user.email
       }, "c3101d360ec26c1334f4e1cfee1c9dbc", {
           subject: user.id,
           expiresIn: "1d"
       })

       console.log(token)

       return token

    }
}

export { AuthenticateUserService }