import { registerUserRepository } from '../repository/UserRepository'
import ValidationError from '../utils/errors/ValidationError'

export const registerUserService = async (user: User) => {
  if (!user.name || !user.email || !user.password)
    throw new ValidationError("Can't be empty", 400)
  const newUser = await registerUserRepository(user)
  return newUser
}
