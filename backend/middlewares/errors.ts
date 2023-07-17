/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'

export default (err: any, req: NextApiRequest, res: NextApiResponse) => {
  let error = { ...err }
  error.statusCode = err.statusCode || 500
  error.message = err.message || 'Internal Server Error'

  res.status(error.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  })
}
