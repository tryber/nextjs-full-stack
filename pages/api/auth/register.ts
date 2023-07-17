import dbConnect from '@/backend/utils/dbConnect'
import { registerUserController } from '@/backend/controllers/UserController'
import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

dbConnect()
const router = createRouter<NextApiRequest, NextApiResponse>()

router.post(async (req, res) => {
  return registerUserController(req, res)
})

export default router.handler({})
