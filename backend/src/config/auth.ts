import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '../types'


dotenv.config()

const JWT_SECRET: string = process.env.JWT_SECRET!
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET!

export const generateAccessToken = (user: TokenPayload): string => {
    return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "15m" })
}


export const generateRefreshToken = (user: TokenPayload): string => {
    return jwt.sign({ id: user.id, role: user.role }, JWT_REFRESH_SECRET, { expiresIn: '7d' })
}

export const verifyAccessToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}

export const verifyRefreshToken = (token: string): TokenPayload | null => {

    try {
        return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload

    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}