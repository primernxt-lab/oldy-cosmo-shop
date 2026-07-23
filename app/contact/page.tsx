'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const s: any = {
    input: { width: '100%', padding: '12px', background: '#111', border: '1px solid #222', color: '#F0EDE8', fontSize: '0.9rem', fontFamily: 'Barlow, sans-serif', boxSizing: 'border-box' },
    label: { display: 'block', fontSize: '0.7rem', color: '#C9A84C', letterSpacing: '0.15em', marginBottom: '8px' },
  }
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ padding: '80px 48px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.3em', marginBottom: '16px' }}>GET IN TOUCH</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '40px', lineHeight: '1.2' }}>Contact Us</h1>
          {[
            { label: 'LINE', value: '@oldycosmo' },
            { label: 'EMAIL', value: 'hello@oldycosmo.com' },
            { label: 'INSTAGRAM', value: '@oldycosmo_official' },
            { label: 'LOCATION', value: 'Bangkok, Thailand' },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '0.7rem', color: '#C9A84C', letterSpacing: '0.15em', marginBottom: '6px' }}>{item.label}</p>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>{item.value}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{ marginBottom: '20px' }}><label style={s.label}>ชื่อ</label><input style={s.input} value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
          <div style={{ marginBottom: '20px' }}><label style={s.label}>Email</label><input style={s.input} value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          <div style={{ marginBottom: '20px' }}><label style={s.label}>เบอร์โทร</label><input style={s.input} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
          <div style={{ marginBottom: '24px' }}><label style={s.label}>ข้อความ</label><textarea style={{...s.input, height: '120px', resize: 'vertical'}} value={form.message} onChange={e => setForm({...form, message: e.target.value})} /></div>
          <button style={{ width: '100%', padding: '14px', background: '#C9A84C', color: '#0A0A0A', border: 'none', cursor: 'pointer', fontWeight: '700', letterSpacing: '0.15em', fontSize: '0.85rem' }}>ส่งข้อความ</button>
        </div>
      </div>
    </div>
  )
}
