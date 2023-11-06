import { admin } from './utils/firebase.js'

import type { Request, Response, NextFunction } from 'express'

export const firebaseAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    })
  }

  try {
    await admin().auth().verifyIdToken(token)
    next()
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    })
    // @ts-expect-error
    console.error(error.message)
  }
}
