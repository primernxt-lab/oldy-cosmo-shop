'use client'
import { useEffect, useState } from 'react'
import { supabase, Product } from '@/lib/supabase'
import Link from 'next/link'

const CATEGORIES = [
  { key: 'ALL', label: 'ทั้งหมด' },
  { key: 'JACKET', label: 'Jacket' },
  { key: 'PANTS', label: 'Pants' },
  { key: 'SHIRT_SHORT', label: 'Short Sleeve' },
  { key: 'SHIRT_LONG', label: 'Long Sleeve' },
  { key: 'TSHIRT', label: 'T-Shirt' },
  { key: 'BAG', label: 'Bag' },
  { key: 'BELT', label: 'Belt' },
  { key: 'ACCESSORIES', label: 'Accessories' },
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchProducts() }, [category])

  async function fetchProducts() {
    setLoading(true)
    let query = supabase.from('products').select('*, product_images(*), product_variants(*)').eq('status', 'active').order('sort_order')
    if (category !== 'ALL') query = query.eq('category', category)
    const { data } = await query
    setProducts(data || [])
    setLoading(false)
  }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ padding: '40px 40px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#C9A84C', letterSpacing: '0.2em' }}>COLLECTIONS</h1>
        <p style={{ color: '#666', marginTop: '8px', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Old Soul. Cosmic Journey.</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', padding: '0 40px 32px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button key={cat.key} onClick={() => setCategory(cat.key)} style={{ padding: '7px 18px', border: `1px solid ${category === cat.key ? '#C9A84C' : '#333'}`, background: category === cat.key ? '#C9A84C' : 'transparent', color: category === cat.key ? '#0A0A0A' : '#F0EDE8', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px', color: '#444' }}>Loading...</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px' }}>
          <p style={{ color: '#C9A84C', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem' }}>Coming Soon</p>
          <p style={{ color: '#555', marginTop: '12px', fontSize: '0.85rem' }}>กำลังเตรียมคอลเลคชั่น...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', padding: '0 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
          {products.map(product => {
            const img = product.product_images?.find((i: any) => i.is_primary) || product.product_images?.[0]
            return (
              <Link key={product.id} href={`/shop/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div>
                  <div style={{ background: '#111', aspectRatio: '3/4', overflow: 'hidden' }}>
                    {img ? <img src={img.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '0.8rem' }}>No Image</div>}
                  </div>
                  <div style={{ padding: '14px 0' }}>
                    <p style={{ fontSize: '0.7rem', color: '#C9A84C', letterSpacing: '0.15em', marginBottom: '4px' }}>{product.category}</p>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', marginBottom: '6px' }}>{product.name_th || product.name}</h3>
                    <p style={{ color: '#C9A84C', fontSize: '0.9rem' }}>฿{product.price?.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
