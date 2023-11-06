import { getUserNameAndEmail, saveUserNameAndEmail } from './utils/db.js'

import type { Request, Response } from 'express'

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid request. Missing user id.',
      })
    }

    const resp = await getUserNameAndEmail(id)

    if (!resp) {
      return res.status(200).json({
        status: 'success',
        data: null,
      })
    }

    res.status(200).json({
      status: 'success',
      data: resp,
    })
  } catch (error) {
    // @ts-expect-error
    console.error(error.message)
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, email } = req.body

    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid request. Missing user id.',
      })
    }

    if (!name || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid request. Missing user name or email.',
      })
    }

    const resp = await saveUserNameAndEmail(id, { name, email })
    res.status(201).json({
      status: 'success',
      message: 'User data saved successfully',
    })
  } catch (error) {
    // @ts-expect-error
    console.error(error.message)
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    })
  }
}
