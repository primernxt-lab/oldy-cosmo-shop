'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const CATEGORIES = ['JACKET','PANTS','SHIRT_SHORT','SHIRT_LONG','TSHIRT','BAG','BELT','ACCESSORIES']
const SIZES = ['XS','S','M','L','XL','XXL','XXXL','FREE SIZE']

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [pw, setPw] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [tab, setTab] = useState<'products'|'orders'>('products')
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ sku:'', name:'', name_th:'', category:'JACKET', collection:'', description_th:'', price:'', status:'active', featured:false })
  const [variants, setVariants] = useState([{ size:'M', color:'', screen_print:'', stock_qty:0 }])
  const [imageUrls, setImageUrls] = useState([''])

  useEffect(() => { if(auth){ fetchProducts(); fetchOrders() } }, [auth])

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*, product_images(*), product_variants(*)').order('created_at', { ascending: false })
    setProducts(data || [])
  }
  async function fetchOrders() {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders(data || [])
  }
  async function updateOrderStatus(id: string, status: string) {
    await supabase.from('orders').update({ order_status: status }).eq('id', id)
    fetchOrders()
  }
  async function saveProduct() {
    if (!form.name || !form.price || !form.sku) return alert('กรุณากรอก SKU, ชื่อสินค้า และราคา')
    setSaving(true)
    const { data: prod, error } = await supabase.from('products').insert({ sku:form.sku, name:form.name, name_th:form.name_th, category:form.category, collection:form.collection, description_th:form.description_th, price:parseFloat(form.price), status:form.status, featured:form.featured }).select().single()
    if (error) { alert('Error: '+error.message); setSaving(false); return }
    if (variants.length) await supabase.from('product_variants').insert(variants.filter(v=>v.size).map((v,i) => ({ product_id:prod.id, size:v.size, color:v.color, screen_print:v.screen_print, stock_qty:v.stock_qty, sku_variant:`${form.sku}-${v.size}-${i}` })))
    const imgs = imageUrls.filter(u=>u.trim())
    if (imgs.length) await supabase.from('product_images').insert(imgs.map((url,i) => ({ product_id:prod.id, image_url:url, is_primary:i===0, sort_order:i })))
    setSaving(false); setShowForm(false); fetchProducts()
    setForm({ sku:'', name:'', name_th:'', category:'JACKET', collection:'', description_th:'', price:'', status:'active', featured:false })
    setVariants([{ size:'M', color:'', screen_print:'', stock_qty:0 }]); setImageUrls([''])
  }
  async function deleteProduct(id: string) {
    if (!confirm('ลบสินค้านี้?')) return
    await supabase.from('products').delete().eq('id', id); fetchProducts()
  }

  const s: any = {
    input: { width:'100%', padding:'10px 12px', background:'#1a1a1a', border:'1px solid #333', color:'#F0EDE8', fontSize:'0.9rem', boxSizing:'border-box' },
    btn: { padding:'10px 24px', background:'#C9A84C', color:'#0A0A0A', border:'none', cursor:'pointer', fontWeight:'700', fontSize:'0.85rem' },
    btnSm: { padding:'6px 14px', background:'transparent', color:'#ff4444', border:'1px solid #ff4444', cursor:'pointer', fontSize:'0.75rem' },
    label: { display:'block', fontSize:'0.72rem', color:'#777', marginBottom:'6px', letterSpacing:'0.1em' },
    card: { background:'#111', border:'1px solid #1e1e1e', padding:'16px', marginBottom:'10px' },
  }

  if (!auth) return (
    <div style={{ background:'#0A0A0A', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ background:'#111', padding:'40px', width:'320px', border:'1px solid #222' }}>
        <h2 style={{ fontFamily:'Playfair Display, serif', color:'#C9A84C', marginBottom:'24px', textAlign:'center' }}>Admin Login</h2>
        <input type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(pw===process.env.NEXT_PUBLIC_ADMIN_PW||pw==='oldy2026'?setAuth(true):alert('รหัสผ่านไม่ถูกต้อง'))} style={{...s.input, marginBottom:'16px'}} />
        <button style={{...s.btn, width:'100%'}} onClick={()=>pw==='oldy2026'?setAuth(true):alert('รหัสผ่านไม่ถูกต้อง')}>เข้าสู่ระบบ</button>
      </div>
    </div>
  )

  return (
    <div style={{ background:'#0A0A0A', minHeight:'100vh', color:'#F0EDE8', fontFamily:'Barlow, sans-serif', padding:'24px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px', borderBottom:'1px solid #1a1a1a', paddingBottom:'16px' }}>
        <h1 style={{ fontFamily:'Playfair Display, serif', color:'#C9A84C', fontSize:'1.6rem' }}>OLDY COSMO — Admin</h1>
        <div style={{ display:'flex', gap:'12px' }}>
          <button style={{...s.btn, background: tab==='products'?'#C9A84C':'transparent', color: tab==='products'?'#0A0A0A':'#C9A84C', border:'1px solid #C9A84C'}} onClick={()=>setTab('products')}>สินค้า ({products.length})</button>
          <button style={{...s.btn, background: tab==='orders'?'#C9A84C':'transparent', color: tab==='orders'?'#0A0A0A':'#C9A84C', border:'1px solid #C9A84C'}} onClick={()=>setTab('orders')}>Orders ({orders.length})</button>
        </div>
      </div>

      {tab === 'products' && <>
        <button style={{...s.btn, marginBottom:'24px'}} onClick={()=>setShowForm(!showForm)}>{showForm?'ยกเลิก':'+ เพิ่มสินค้าใหม่'}</button>
        {showForm && (
          <div style={{ background:'#111', border:'1px solid #C9A84C', padding:'24px', marginBottom:'32px' }}>
            <h2 style={{ color:'#C9A84C', marginBottom:'20px' }}>เพิ่มสินค้าใหม่</h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }}>
              <div><label style={s.label}>SKU *</label><input style={s.input} value={form.sku} onChange={e=>setForm({...form,sku:e.target.value})} placeholder="OC-JK-VTG-001" /></div>
              <div><label style={s.label}>Category</label><select style={s.input} value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
              <div><label style={s.label}>ชื่อสินค้า (EN) *</label><input style={s.input} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
              <div><label style={s.label}>ชื่อสินค้า (TH)</label><input style={s.input} value={form.name_th} onChange={e=>setForm({...form,name_th:e.target.value})} /></div>
              <div><label style={s.label}>Collection</label><input style={s.input} value={form.collection} onChange={e=>setForm({...form,collection:e.target.value})} placeholder="Vintage / Military" /></div>
              <div><label style={s.label}>ราคา (THB) *</label><input style={s.input} type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} /></div>
            </div>
            <div style={{ marginBottom:'16px' }}><label style={s.label}>รายละเอียด (TH)</label><textarea style={{...s.input,height:'70px',resize:'vertical'}} value={form.description_th} onChange={e=>setForm({...form,description_th:e.target.value})} /></div>
            <div style={{ marginBottom:'16px' }}>
              <label style={{...s.label,color:'#C9A84C'}}>รูปภาพ (URL)</label>
              {imageUrls.map((url,i)=>(
                <div key={i} style={{ display:'flex', gap:'8px', marginBottom:'8px' }}>
                  <input style={s.input} value={url} onChange={e=>{const a=[...imageUrls];a[i]=e.target.value;setImageUrls(a)}} placeholder={`URL รูปที่ ${i+1}${i===0?' (หลัก)':''}`} />
                  {i>0&&<button onClick={()=>setImageUrls(imageUrls.filter((_,j)=>j!==i))} style={s.btnSm}>ลบ</button>}
                </div>
              ))}
              <button onClick={()=>setImageUrls([...imageUrls,''])} style={{ background:'transparent', color:'#555', border:'1px solid #2a2a2a', padding:'6px 14px', cursor:'pointer', fontSize:'0.8rem' }}>+ เพิ่มรูป</button>
            </div>
            <div style={{ marginBottom:'20px' }}>
              <label style={{...s.label,color:'#C9A84C'}}>ไซส์ / สต็อก</label>
              {variants.map((v,i)=>(
                <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 2fr 80px auto', gap:'8px', marginBottom:'8px' }}>
                  <select style={s.input} value={v.size} onChange={e=>{const a=[...variants];a[i].size=e.target.value;setVariants(a)}}>{SIZES.map(sz=><option key={sz} value={sz}>{sz}</option>)}</select>
                  <input style={s.input} value={v.color} onChange={e=>{const a=[...variants];a[i].color=e.target.value;setVariants(a)}} placeholder="สี" />
                  <input style={s.input} value={v.screen_print} onChange={e=>{const a=[...variants];a[i].screen_print=e.target.value;setVariants(a)}} placeholder="ลายสกรีน" />
                  <input style={s.input} type="number" value={v.stock_qty} onChange={e=>{const a=[...variants];a[i].stock_qty=parseInt(e.target.value)||0;setVariants(a)}} />
                  {i>0&&<button onClick={()=>setVariants(variants.filter((_,j)=>j!==i))} style={s.btnSm}>ลบ</button>}
                </div>
              ))}
              <button onClick={()=>setVariants([...variants,{size:'L',color:'',screen_print:'',stock_qty:0}])} style={{ background:'transparent', color:'#555', border:'1px solid #2a2a2a', padding:'6px 14px', cursor:'pointer', fontSize:'0.8rem' }}>+ เพิ่มไซส์</button>
            </div>
            <button style={s.btn} onClick={saveProduct} disabled={saving}>{saving?'กำลังบันทึก...':'บันทึกสินค้า'}</button>
          </div>
        )}
        {products.map(p=>(
          <div key={p.id} style={s.card}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ display:'flex', gap:'16px', alignItems:'center' }}>
                {p.product_images?.[0]&&<img src={p.product_images[0].image_url} style={{ width:'56px', height:'72px', objectFit:'cover' }} />}
                <div>
                  <p style={{ fontSize:'0.7rem', color:'#C9A84C', letterSpacing:'0.1em' }}>{p.sku} · {p.category}</p>
                  <p style={{ fontFamily:'Playfair Display, serif', margin:'4px 0' }}>{p.name_th||p.name}</p>
                  <p style={{ color:'#C9A84C', fontSize:'0.9rem' }}>฿{p.price?.toLocaleString()} · {p.product_variants?.length||0} ไซส์</p>
                </div>
              </div>
              <button style={s.btnSm} onClick={()=>deleteProduct(p.id)}>ลบ</button>
            </div>
          </div>
        ))}
      </>}

      {tab === 'orders' && <>
        {orders.length===0?<p style={{ color:'#444', padding:'40px 0' }}>ยังไม่มี Order</p>:orders.map(o=>(
          <div key={o.id} style={s.card}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <p style={{ color:'#C9A84C', fontSize:'0.8rem', letterSpacing:'0.1em' }}>{o.order_number}</p>
                <p style={{ fontFamily:'Playfair Display, serif', margin:'4px 0' }}>{o.customer_name}</p>
                <p style={{ color:'#666', fontSize:'0.8rem' }}>{o.customer_phone} · {new Date(o.created_at).toLocaleDateString('th-TH')}</p>
                <p style={{ color:'#C9A84C', marginTop:'4px' }}>฿{o.total_amount?.toLocaleString()}</p>
              </div>
              <select value={o.order_status} onChange={e=>updateOrderStatus(o.id,e.target.value)} style={{ padding:'6px 12px', background:'#1a1a1a', border:'1px solid #333', color:'#F0EDE8', cursor:'pointer', fontSize:'0.8rem' }}>
                <option value="new">ใหม่</option>
                <option value="confirmed">ยืนยันแล้ว</option>
                <option value="packing">กำลังแพ็ค</option>
                <option value="shipped">จัดส่งแล้ว</option>
                <option value="delivered">ส่งถึงแล้ว</option>
              </select>
            </div>
          </div>
        ))}
      </>}
    </div>
  )
}

