'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const [content, setContent] = useState<Record<string, string>>({})

  useEffect(() => {
    supabase.from('page_content').select('*').eq('page_key', 'home').then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {}
        data.forEach((r: any) => { map[r.section_key] = r.content })
        setContent(map)
      }
    })
  }, [])

  const heroTitle = content.hero_title || 'OLD SOUL. COSMIC JOURNEY.'
  const heroSubtitle = content.hero_subtitle || 'Wear Slowly. Travel Further. Built to Last.'
  const sec1Title = content.section1_title || 'THE COLLECTION'
  const sec1Body = content.section1_body || 'เสื้อผ้าที่ออกแบบมาเพื่อยืนหยัดต่อกาลเวลา'

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 40px', position: 'relative', overflow: 'hidden' }}>
        {content.hero_image && <img src={content.hero_image} alt="Hero" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.3em', marginBottom: '24px' }}>{heroTitle}</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#F0EDE8', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '0.05em' }}>
            OLDY<br />COSMO
          </h1>
          <p style={{ color: '#666', fontSize: '1rem', marginBottom: '48px', letterSpacing: '0.1em' }}>{heroSubtitle}</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/shop" style={{ padding: '14px 40px', background: '#C9A84C', color: '#0A0A0A', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: '700' }}>SHOP NOW</Link>
            <Link href="/about" style={{ padding: '14px 40px', border: '1px solid #444', color: '#F0EDE8', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em' }}>OUR STORY</Link>
          </div>
        </div>
      </div>

      <div style={{ padding: '100px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C', textAlign: 'center', letterSpacing: '0.2em', marginBottom: '16px' }}>{sec1Title}</h2>
        <p style={{ color: '#555', textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px', lineHeight: 1.8, fontSize: '0.9rem' }}>{sec1Body}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px', textAlign: 'center' }}>
          {[
            { title: 'TIMELESS', desc: 'ออกแบบให้ใช้ได้ตลอดชีวิต ไม่ตาม trend' },
            { title: 'AUTHENTIC', desc: 'วัสดุแท้ งานฝีมือจริง ทุกชิ้นมีจิตวิญญาณ' },
            { title: 'BUILT TO AGE', desc: 'ยิ่งใช้ยิ่งสวย เหมือน vintage จริงๆ' },
          ].map(item => (
            <div key={item.title}>
              <div style={{ width: '40px', height: '1px', background: '#C9A84C', margin: '0 auto 24px' }} />
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C', letterSpacing: '0.2em', marginBottom: '12px', fontSize: '0.9rem' }}>{item.title}</h3>
              <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: '1.7' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '80px 48px 120px', borderTop: '1px solid #1a1a1a' }}>
        <p style={{ color: '#555', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '16px' }}>COLLECTIONS 2026</p>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '32px', color: '#F0EDE8' }}>Wear Slowly. Travel Further.</h2>
        <Link href="/shop" style={{ padding: '14px 48px', border: '1px solid #C9A84C', color: '#C9A84C', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em' }}>VIEW ALL COLLECTIONS</Link>
      </div>
    </div>
  )
}
