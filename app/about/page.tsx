export default function AboutPage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ padding: '80px 48px', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.3em', marginBottom: '16px' }}>OUR STORY</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: '48px', lineHeight: '1.2' }}>
          "OLDY COSMO didn't start<br />with fashion. It began<br />with a memory."
        </h1>
        <div style={{ borderLeft: '1px solid #C9A84C', paddingLeft: '32px', marginBottom: '48px' }}>
          <p style={{ color: '#888', lineHeight: '2', fontSize: '0.95rem' }}>
            เราไม่ได้สร้างเสื้อผ้า — เราสร้างเวลา<br /><br />
            OLDY COSMO เกิดจากความเชื่อที่ว่าเสื้อผ้าที่ดีไม่ควรหมดอายุ ไม่ควรตามกระแส และควรมีชีวิตของมันเอง<br /><br />
            แรงบันดาลใจมาจาก Vintage Americana, Military Heritage และ Japanese Workwear — สิ่งที่ถูกสร้างขึ้นเพื่อทน เพื่อใช้ และเพื่อเดินทาง
          </p>
        </div>
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
