import { Request, Response, NextFunction } from "express"
import jwt, {JwtPayload} from "jsonwebtoken"


interface CustomRequest extends Request {
    user?: JwtPayload
}

export const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token: string | undefined = req.header('authorization')?.split(" ")[1]

    if (!token) {res.status(401).json({message: "Access denied, missing token"})}
    else {

        try {
            const verified: JwtPayload = jwt.verify(token, process.env.SECRET as string) as JwtPayload
            req.user = verified
            next()

        } catch (error: any) {
            res.status(401).json ({message: "Access denied, missing token"})
        }

    }
}