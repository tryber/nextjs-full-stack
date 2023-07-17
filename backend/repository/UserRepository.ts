import User from '../models/user'

export const registerUserRepository = async (user: User) => {
  const newUser = await User.create(user)
  return newUser
}
