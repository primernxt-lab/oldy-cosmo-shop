import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 40px', background: 'linear-gradient(to bottom, #0A0A0A 0%, #111 50%, #0A0A0A 100%)' }}>
        <p style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.3em', marginBottom: '24px' }}>OLD SOUL · COSMIC JOURNEY</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#F0EDE8', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '0.05em' }}>
          OLDY<br />COSMO
        </h1>
        <p style={{ color: '#666', fontSize: '1rem', marginBottom: '48px', letterSpacing: '0.1em' }}>Vintage Americana × Military Heritage × Japanese Workwear</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link href="/shop" style={{ padding: '14px 40px', background: '#C9A84C', color: '#0A0A0A', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: '700' }}>SHOP NOW</Link>
          <Link href="/about" style={{ padding: '14px 40px', border: '1px solid #444', color: '#F0EDE8', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em' }}>OUR STORY</Link>
        </div>
      </div>

      {/* Brand DNA */}
      <div style={{ padding: '100px 48px', maxWidth: '1200px', margin: '0 auto' }}>
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

      {/* CTA Shop */}
      <div style={{ textAlign: 'center', padding: '80px 48px 120px', borderTop: '1px solid #1a1a1a' }}>
        <p style={{ color: '#555', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '16px' }}>COLLECTIONS 2026</p>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '32px' }}>Wear Slowly. Travel Further.</h2>
        <Link href="/shop" style={{ padding: '14px 48px', border: '1px solid #C9A84C', color: '#C9A84C', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em' }}>VIEW ALL COLLECTIONS</Link>
      </div>
    </div>
  )
}
