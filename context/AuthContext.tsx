import { FC, ReactNode, createContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface AuthProviderProps {
  children?: ReactNode
}

interface AuthContextProps {
  user: User | null | undefined
  error: string | null
  loading: boolean
  updated: boolean
  setUpdated: (updated: boolean) => void
  setUser: (user: User | null) => void
  registerUser: (credentials: {
    name: string
    email: string
    password: string
  }) => Promise<void>
  updateProfile: (formData: User) => Promise<void>
  updatePassword: (credentials: {
    currentPassword: string
    newPassword: string
  }) => Promise<void>
  updateUser: (id: string, userData: User) => Promise<void>
  deleteUser: (id: string) => Promise<void>
  addNewAddress: (address: string) => Promise<void>
  updateAddress: (id: string, address: string) => Promise<void>
  deleteAddress: (id: string) => Promise<void>
  clearErrors: () => void
}

const AuthContext = createContext<AuthContextProps>({} as any)

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [updated, setUpdated] = useState<boolean>(false)
  const router = useRouter()

  const registerUser = async ({ name, email, password }: User) => {
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      )

      if (data?.user) {
        router.push('/')
      }
    } catch (error: any) {
      setError(error?.response?.data?.message)
    }
  }

  const loadUser = async () => {
    try {
      setLoading(true)

      const { data } = await axios.get('/api/auth/session?update')

      if (data?.user) {
        setUser(data.user)
        router.replace('/me')
      }
    } catch (error: any) {
      setError(error?.response?.data?.message)
    }
  }

  const updateProfile = async (formData: User) => {
    try {
      setLoading(true)

      const { data } = await axios.put(
        `${process.env.API_URL}/api/auth/me/update`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (data?.user) {
        loadUser()
        setLoading(false)
      }
    } catch (error: any) {
      setLoading(false)
      setError(error?.response?.data?.message)
    }
  }

  const updatePassword = async ({ currentPassword, newPassword }: any) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/auth/me/update_password`,
        {
          currentPassword,
          newPassword,
        }
      )

      if (data?.success) {
        router.replace('/me')
      }
    } catch (error: any) {
      setError(error?.response?.data?.message)
    }
  }

  const updateUser = async (id: string, userData: User) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/admin/users/${id}`,
        {
          userData,
        }
      )

      if (data?.success) {
        setUpdated(true)
        router.replace(`/admin/users/${id}`)
      }
    } catch (error: any) {
      setError(error?.response?.data?.message)
    }
  }

  const deleteUser = async (id: string) => {
    try {
      const { data } = await axios.delete(
        `${process.env.API_URL}/api/admin/users/${id}`
      )

      if (data?.success) {
        router.replace(`/admin/users`)
      }
    } catch (error: any) {
      setError(error?.response?.data?.message)
    }
  }

  const addNewAddress = async (address: string) => {
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/address`,
        address
      )

      if (data) {
        router.push('/me')
      }
    } catch (error: any) {
      setError(error?.response?.data?.message)
    }
  }

  const updateAddress = async (id: string, address: string) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/address/${id}`,
        address
      )

      if (data?.address) {
        setUpdated(true)
        router.replace(`/address/${id}`)
      }
    } catch (error: any) {
      setError(error?.response?.data?.message)
    }
  }

  const deleteAddress = async (id: string) => {
    try {
      const { data } = await axios.delete(
        `${process.env.API_URL}/api/address/${id}`
      )

      if (data?.success) {
        router.push('/me')
      }
    } catch (error: any) {
      setError(error?.response?.data?.message)
    }
  }

  const clearErrors = () => {
    setError(null)
  }

  const authContextValue = {
    user,
    error,
    loading,
    updated,
    setUpdated,
    setUser,
    registerUser,
    updateProfile,
    updatePassword,
    updateUser,
    deleteUser,
    addNewAddress,
    updateAddress,
    deleteAddress,
    clearErrors,
  }

  children
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
