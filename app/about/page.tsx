'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  const [content, setContent] = useState<Record<string, string>>({})

  useEffect(() => {
    supabase.from('page_content').select('*').eq('page_key', 'about').then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {}
        data.forEach((r: any) => { map[r.section_key] = r.content })
        setContent(map)
      }
    })
  }, [])

  const title = content.title || 'ABOUT OLDY COSMO'
  const body = content.body || 'OLDY COSMO เกิดจากความหลงใหลในเสื้อผ้าที่มีจิตวิญญาณ'

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ padding: '80px 48px', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.3em', marginBottom: '16px' }}>OUR STORY</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: '48px', lineHeight: '1.2', color: '#F0EDE8' }}>{title}</h1>
        <div style={{ borderLeft: '1px solid #C9A84C', paddingLeft: '32px', marginBottom: '48px' }}>
          <p style={{ color: '#888', lineHeight: '2', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{body}</p>
        </div>
        {content.image && <img src={content.image} alt="About" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', marginBottom: '48px' }} />}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {[
            { label: 'BRAND', value: 'OLDY COSMO' },
            { label: 'FOUNDED', value: 'Bangkok, 2026' },
            { label: 'STYLE', value: 'Vintage × Military × Workwear' },
            { label: 'MADE IN', value: 'Thailand' },
          ].map(item => (
            <div key={item.label} style={{ borderTop: '1px solid #1a1a1a', paddingTop: '20px' }}>
              <p style={{ fontSize: '0.7rem', color: '#C9A84C', letterSpacing: '0.15em', marginBottom: '8px' }}>{item.label}</p>
              <p style={{ color: '#F0EDE8', fontSize: '0.95rem' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
