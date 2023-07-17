import { registerUserService } from '../services/UserService'
import { NextApiRequest, NextApiResponse } from 'next'
import onError from '@/backend/middlewares/errors'

export const registerUserController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const user = await registerUserService(req.body as User)
    return res.status(201).json({
      user,
    })
  } catch (error: any) {
    onError(error, req, res)
  }
}
