'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/store/cart'

export const dynamic = 'force-dynamic'

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const addItem = useCart(s => s.addItem)
  const [product, setProduct] = useState<any>(null)
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => { if(id) fetchProduct() }, [id])

  async function fetchProduct() {
    const { data } = await supabase
      .from('products')
      .select('*, product_images(*), product_variants(*)')
      .eq('id', id)
      .single()
    if (data) {
      setProduct(data)
      const primary = data.product_images?.find((i: any) => i.is_primary) || data.product_images?.[0]
      if (primary) setSelectedImage(primary.image_url)
      if (data.product_variants?.[0]) setSelectedVariant(data.product_variants[0])
    }
  }

  function handleAddToCart() {
    if (!product || !selectedVariant) return
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      nameTh: product.name_th || product.name,
      size: selectedVariant.size,
      color: selectedVariant.color || '',
      price: selectedVariant.price_override || product.price,
      quantity: qty,
      imageUrl: selectedImage,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const gold = '#C9A84C'
  const dark = '#0A0A0A'

  if (!product) return (
    <div style={{ background: dark, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>
      Loading...
    </div>
  )

  return (
    <div style={{ background: dark, minHeight: '100vh', color: '#F0EDE8', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>

        <div>
          <div style={{ background: '#111', aspectRatio: '3/4', overflow: 'hidden', marginBottom: '12px' }}>
            {selectedImage
              ? <img src={selectedImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', background: '#111' }} />
            }
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {product.product_images?.map((img: any) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img.image_url)}
                style={{ width: '72px', height: '90px', border: `1px solid ${selectedImage === img.image_url ? gold : '#222'}`, cursor: 'pointer', overflow: 'hidden' }}
              >
                <img src={img.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: '0.7rem', color: gold, letterSpacing: '0.2em', marginBottom: '8px' }}>{product.category}</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: '8px', lineHeight: 1.2 }}>
            {product.name_th || product.name}
          </h1>
          <p style={{ fontSize: '1.4rem', color: gold, marginBottom: '24px' }}>฿{product.price?.toLocaleString()}</p>

          {product.description_th && (
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '28px', borderTop: '1px solid #1a1a1a', paddingTop: '20px' }}>
              {product.description_th}
            </p>
          )}

          {product.product_variants?.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '0.72rem', color: '#777', letterSpacing: '0.1em', marginBottom: '10px' }}>เลือกไซส์</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.product_variants.map((v: any) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    style={{
                      padding: '8px 18px',
                      border: `1px solid ${selectedVariant?.id === v.id ? gold : '#333'}`,
                      background: selectedVariant?.id === v.id ? gold : 'transparent',
                      color: selectedVariant?.id === v.id ? dark : '#F0EDE8',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                    }}
                  >
                    {v.size}{v.color ? ` · ${v.color}` : ''}
                  </button>
                ))}
              </div>
              {selectedVariant && (
                <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '8px' }}>สต็อก: {selectedVariant.stock_qty} ชิ้น</p>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', border: '1px solid #333' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '10px 16px', background: 'transparent', color: '#F0EDE8', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>−</button>
              <span style={{ padding: '10px 20px', borderLeft: '1px solid #333', borderRight: '1px solid #333' }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ padding: '10px 16px', background: 'transparent', color: '#F0EDE8', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>+</button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            style={{ width: '100%', padding: '14px', background: gold, color: dark, border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem', marginBottom: '12px', letterSpacing: '0.1em' }}
          >
            {added ? 'เพิ่มลงตะกร้าแล้ว' : 'เพิ่มลงตะกร้า'}
          </button>
          <button
            onClick={() => { handleAddToCart(); router.push('/cart') }}
            style={{ width: '100%', padding: '14px', background: 'transparent', color: gold, border: `1px solid ${gold}`, cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.1em' }}
          >
            ซื้อเลย
          </button>

          <div style={{ marginTop: '32px', borderTop: '1px solid #1a1a1a', paddingTop: '20px' }}>
            <p style={{ fontSize: '0.75rem', color: '#444', lineHeight: 1.8 }}>SKU: {product.sku}</p>
            <p style={{ fontSize: '0.75rem', color: '#444', lineHeight: 1.8 }}>จัดส่งทั่วประเทศ · ชำระผ่าน PromptPay</p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #111' }}>
        <button onClick={() => router.back()} style={{ background: 'transparent', color: '#444', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>
          ← กลับ
        </button>
      </div>
    </div>
  )
}
