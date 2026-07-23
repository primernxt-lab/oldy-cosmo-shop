'use client'
import { useCart } from '@/store/cart'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart()

  if (items.length === 0) return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
      <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#C9A84C' }}>ตะกร้าว่างเปล่า</p>
      <Link href="/shop" style={{ padding: '12px 32px', border: '1px solid #C9A84C', color: '#C9A84C', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.1em' }}>ช้อปสินค้า</Link>
    </div>
  )

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px', padding: '100px 40px 80px' }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C', fontSize: '2rem', letterSpacing: '0.2em', marginBottom: '40px' }}>CART</h1>

      <div style={{ maxWidth: '800px' }}>
        {items.map(item => (
          <div key={item.variantId} style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #1a1a1a', paddingBottom: '24px', marginBottom: '24px', alignItems: 'center' }}>
            {item.imageUrl && <img src={item.imageUrl} style={{ width: '80px', height: '100px', objectFit: 'cover' }} />}
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', marginBottom: '4px' }}>{item.nameTh || item.name}</p>
              <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '8px' }}>ไซส์: {item.size} {item.color && `| ${item.color}`}</p>
              <p style={{ color: '#C9A84C' }}>฿{item.price.toLocaleString()}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => updateQty(item.variantId, Math.max(1, item.quantity - 1))} style={{ background: '#1a1a1a', border: 'none', color: '#F0EDE8', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem' }}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQty(item.variantId, item.quantity + 1)} style={{ background: '#1a1a1a', border: 'none', color: '#F0EDE8', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem' }}>+</button>
            </div>
            <button onClick={() => removeItem(item.variantId)} style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
          </div>
        ))}

        <div style={{ borderTop: '1px solid #333', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>ยอดรวม</p>
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#C9A84C' }}>฿{total().toLocaleString()}</p>
          </div>
          <Link href="/checkout" style={{ padding: '14px 40px', background: '#C9A84C', color: '#0A0A0A', textDecoration: 'none', fontWeight: '700', letterSpacing: '0.1em', fontSize: '0.9rem' }}>
            สั่งซื้อ
          </Link>
        </div>
      </div>
    </div>
  )
}
