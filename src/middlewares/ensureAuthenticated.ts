import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string
}

export function ensureAuthenticated (request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization

    if(!authToken) return response.status(401).end()

    const [, token] = authToken.split(' ')

    try {
        const { sub } = verify(token, "c3101d360ec26c1334f4e1cfee1c9dbc") as IPayload

        request.user_id = sub

        next()
    } catch {
        return response.status(401).end()
    }  


}