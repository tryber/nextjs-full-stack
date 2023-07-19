'use client'
import { useRouter } from 'next/navigation'
import { createContext, useState, useEffect, FC, ReactNode } from 'react'

interface CartItem {
  product: string
  name: string
  price: number
  image: string
  stock: number
  seller: string
  quantity: number
}

interface CheckoutInfo {
  amount: number
  tax: number
  totalAmount: number
}

interface CartContextProps {
  cart: CartItem[]
  addItemToCart: (item: CartItem) => void
  deleteItemFromCart: (id: string) => void
  saveOnCheckout: (checkoutInfo: CheckoutInfo) => void
  clearCart: () => void
}

interface CartProviderProps {
  children?: ReactNode
}

const CartContext = createContext<CartContextProps>({} as any)

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const router = useRouter()

  useEffect(() => {
    setCartToState()
  }, [])

  const setCartToState = () => {
    const cartData = localStorage.getItem('cart')
    const parsedCart = cartData ? JSON.parse(cartData) : []

    setCart(parsedCart)
  }

  const addItemToCart = async ({
    product,
    name,
    price,
    image,
    stock,
    seller,
    quantity = 1,
  }: any) => {
    const item = {
      product,
      name,
      price,
      image,
      stock,
      seller,
      quantity,
    }

    const isItemExist = cart.find((i) => i.product === item.product)
    let newCartItems

    if (isItemExist) {
      newCartItems = cart.map((i) =>
        i.product === isItemExist.product ? item : i
      )
    } else {
      newCartItems = [...cart, item]
    }
    localStorage.setItem('cart', JSON.stringify({ cartItems: newCartItems }))
    setCartToState()
  }

  const deleteItemFromCart = (id: string) => {
    const newCartItems = cart.filter((i) => i.product !== id)
    localStorage.setItem('cart', JSON.stringify(newCartItems))
    setCartToState()
  }

  const saveOnCheckout = ({ amount, tax, totalAmount }: any) => {
    const checkoutInfo = {
      amount,
      tax,
      totalAmount,
    }

    const newCart = { ...cart, checkoutInfo }
    localStorage.setItem('cart', JSON.stringify(newCart))
    setCartToState()
    router.push('/shipping')
  }

  const clearCart = () => {
    localStorage.removeItem('cart')
    setCartToState()
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        saveOnCheckout,
        deleteItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
