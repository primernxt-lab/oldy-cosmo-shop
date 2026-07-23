import { create } from 'zustand'

export interface CartItem {
  productId: string
  variantId: string
  name: string
  nameTh: string
  size: string
  color: string
  price: number
  quantity: number
  imageUrl?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateQty: (variantId: string, qty: number) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    const existing = get().items.find(i => i.variantId === item.variantId)
    if (existing) {
      set({
        items: get().items.map(i =>
          i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      })
    } else {
      set({ items: [...get().items, item] })
    }
  },

  removeItem: (variantId) => {
    set({ items: get().items.filter(i => i.variantId !== variantId) })
  },

  updateQty: (variantId, qty) => {
    if (qty <= 0) {
      get().removeItem(variantId)
      return
    }
    set({
      items: get().items.map(i =>
        i.variantId === variantId ? { ...i, quantity: qty } : i
      )
    })
  },

  clearCart: () => set({ items: [] }),

  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

  count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}))
