import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type ProductImage = {
  id: string; product_id: string; image_url: string
  is_primary: boolean; sort_order: number; alt_text: string
}
export type ProductVariant = {
  id: string; product_id: string; size: string; color: string
  screen_print: string; stock_qty: number; sku_variant: string; price_override: number | null
}
export type Product = {
  id: string; sku: string; name: string; name_th: string; category: string
  collection: string; description: string; description_th: string; price: number
  status: string; featured: boolean; sort_order: number
  product_images: ProductImage[]; product_variants: ProductVariant[]
}
export type Order = {
  id: string; order_number: string; customer_name: string; customer_phone: string
  customer_email: string; shipping_address: string; total_amount: number
  payment_status: string; order_status: string; created_at: string
}
