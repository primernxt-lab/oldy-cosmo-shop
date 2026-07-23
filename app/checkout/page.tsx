'use client'
import { useState } from 'react'
import { useCart } from '@/store/cart'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', note: '' })
  const [loading, setLoading] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [step, setStep] = useState<'form'|'payment'|'done'>('form')

  async function submitOrder() {
    if (!form.name || !form.phone || !form.address) return alert('กรุณากรอกข้อมูลให้ครบ')
    setLoading(true)
    const orderNum = 'OC-' + Date.now().toString().slice(-8)
    const { data: order, error } = await supabase.from('orders').insert({
      order_number: orderNum, customer_name: form.name, customer_phone: form.phone,
      customer_email: form.email, shipping_address: form.address, notes: form.note,
      total_amount: total(), payment_status: 'pending', order_status: 'new'
    }).select().single()

    if (error) { alert('เกิดข้อผิดพลาด: ' + error.message); setLoading(false); return }

    await supabase.from('order_items').insert(items.map(item => ({
      order_id: order.id, product_id: item.productId, variant_id: item.variantId,
      product_name: item.nameTh || item.name, size: item.size, color: item.color,
      quantity: item.quantity, unit_price: item.price, subtotal: item.price * item.quantity
    })))

    setOrderNumber(orderNum)
    setStep('payment')
    setLoading(false)
  }

  if (step === 'payment') return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '120px 40px 80px' }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C', fontSize: '1.8rem', marginBottom: '8px' }}>ชำระเงิน</h1>
      <p style={{ color: '#666', marginBottom: '32px', fontSize: '0.85rem' }}>Order: {orderNumber}</p>
      
      <div style={{ background: '#111', border: '1px solid #222', padding: '32px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '16px', letterSpacing: '0.1em' }}>PROMPTPAY</p>
        <div style={{ background: '#fff', padding: '20px', marginBottom: '20px' }}>
          <p style={{ color: '#0A0A0A', fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold' }}>0XX-XXX-XXXX</p>
          <p style={{ color: '#333', fontSize: '0.8rem', marginTop: '8px' }}>OLDY COSMO / PRIMER GROUP</p>
        </div>
        <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#C9A84C', marginBottom: '24px' }}>฿{total().toLocaleString()}</p>
        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '24px' }}>สแกน QR แล้วส่งสลิปมาที่ LINE @oldycosmo</p>
        <button onClick={() => { clearCart(); router.push('/shop') }} style={{ padding: '12px 32px', background: '#C9A84C', color: '#0A0A0A', border: 'none', cursor: 'pointer', fontWeight: '700', width: '100%', fontSize: '0.9rem' }}>
          ชำระเงินแล้ว — กลับไปช้อป
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', padding: '100px 40px 80px' }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C', fontSize: '2rem', letterSpacing: '0.2em', marginBottom: '40px' }}>CHECKOUT</h1>
      <div style={{ maxWidth: '600px' }}>
        {[
          { label: 'ชื่อ-นามสกุล *', key: 'name', placeholder: 'Bobby Smith' },
          { label: 'เบอร์โทรศัพท์ *', key: 'phone', placeholder: '08X-XXX-XXXX' },
          { label: 'Email', key: 'email', placeholder: 'email@example.com' },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#888', marginBottom: '8px', letterSpacing: '0.1em' }}>{f.label}</label>
            <input value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} placeholder={f.placeholder} style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: '#F0EDE8', fontSize: '0.9rem' }} />
          </div>
        ))}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#888', marginBottom: '8px', letterSpacing: '0.1em' }}>ที่อยู่จัดส่ง *</label>
          <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} rows={3} style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: '#F0EDE8', fontSize: '0.9rem', resize: 'vertical' }} />
        </div>
        <div style={{ background: '#111', padding: '20px', marginBottom: '24px', borderTop: '1px solid #C9A84C' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#888', fontSize: '0.85rem' }}>จำนวนสินค้า</span>
            <span>{items.reduce((s,i) => s+i.quantity, 0)} ชิ้น</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#888', fontSize: '0.85rem' }}>ยอดรวม</span>
            <span style={{ color: '#C9A84C', fontSize: '1.2rem', fontFamily: 'Playfair Display, serif' }}>฿{total().toLocaleString()}</span>
          </div>
        </div>
        <button onClick={submitOrder} disabled={loading} style={{ width: '100%', padding: '16px', background: '#C9A84C', color: '#0A0A0A', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', letterSpacing: '0.1em' }}>
          {loading ? 'กำลังสร้าง Order...' : 'ยืนยันคำสั่งซื้อ'}
        </button>
      </div>
    </div>
  )
}
