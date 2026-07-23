'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const PAGES = [
  { key: 'home', label: 'Home', sections: [
    { key: 'hero_title', label: 'Hero Title', type: 'text' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'text' },
    { key: 'hero_image', label: 'Hero Image URL', type: 'text' },
    { key: 'section1_title', label: 'Section Title', type: 'text' },
    { key: 'section1_body', label: 'Section Body', type: 'textarea' },
  ]},
  { key: 'about', label: 'About Us', sections: [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'body', label: 'เนื้อหา', type: 'textarea' },
    { key: 'image', label: 'Image URL', type: 'text' },
  ]},
  { key: 'blog', label: 'Blog', sections: [
    { key: 'title', label: 'Blog Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
  ]},
]

export function CMSTab({ s }: { s: any }) {
  const [activePage, setActivePage] = useState('home')
  const [content, setContent] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => { loadContent(activePage) }, [activePage])

  async function loadContent(pageKey: string) {
    const { data } = await supabase.from('page_content').select('*').eq('page_key', pageKey)
    if (data) {
      const map: Record<string, string> = {}
      data.forEach((r: any) => { map[r.section_key] = r.content })
      setContent(map)
    }
  }

  async function saveContent() {
    setSaving(true)
    const page = PAGES.find(p => p.key === activePage)
    if (!page) return
    for (const section of page.sections) {
      await supabase.from('page_content').upsert({
        page_key: activePage,
        section_key: section.key,
        content: content[section.key] || '',
      }, { onConflict: 'page_key,section_key' })
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const page = PAGES.find(p => p.key === activePage)

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        {PAGES.map(p => (
          <button key={p.key} onClick={() => setActivePage(p.key)} style={{ padding: '8px 20px', background: activePage === p.key ? '#C9A84C' : 'transparent', color: activePage === p.key ? '#0A0A0A' : '#C9A84C', border: '1px solid #C9A84C', cursor: 'pointer', fontSize: '0.8rem' }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '24px' }}>
        <h2 style={{ color: '#C9A84C', marginBottom: '20px', fontFamily: 'Playfair Display, serif' }}>แก้ไขหน้า: {page?.label}</h2>
        {page?.sections.map(section => (
          <div key={section.key} style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', color: '#777', marginBottom: '6px', letterSpacing: '0.1em' }}>{section.label}</label>
            {section.type === 'textarea'
              ? <textarea value={content[section.key] || ''} onChange={e => setContent({ ...content, [section.key]: e.target.value })} style={{ width: '100%', padding: '10px 12px', background: '#1a1a1a', border: '1px solid #333', color: '#F0EDE8', fontSize: '0.9rem', height: '120px', resize: 'vertical', boxSizing: 'border-box' }} />
              : <input value={content[section.key] || ''} onChange={e => setContent({ ...content, [section.key]: e.target.value })} style={{ width: '100%', padding: '10px 12px', background: '#1a1a1a', border: '1px solid #333', color: '#F0EDE8', fontSize: '0.9rem', boxSizing: 'border-box' }} />
            }
          </div>
        ))}
        <button onClick={saveContent} disabled={saving} style={{ padding: '10px 32px', background: '#C9A84C', color: '#0A0A0A', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>
          {saved ? 'บันทึกแล้ว ✓' : saving ? 'กำลังบันทึก...' : 'บันทึก'}
        </button>
      </div>
    </div>
  )
}
