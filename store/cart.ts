import { create } from "zustand"
export type CartItem = {
  productId: string; variantId: string; name: string; name_th: string
  size: string; color: string; price: number; quantity: number; imageUrl: string
}
type CartStore = {
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
    if
