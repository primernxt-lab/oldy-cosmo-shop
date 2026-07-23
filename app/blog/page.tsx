export default function BlogPage() {
  const posts = [
    { title: 'Military Style — ต้นกำเนิดแห่งความแข็งแกร่ง', date: 'July 2026', tag: 'Style Guide', excerpt: 'เสื้อผ้า Military ไม่ใช่แค่แฟชั่น มันคือประวัติศาสตร์ที่คุณสวมใส่ได้' },
    { title: 'Vintage Americana — เรื่องราวที่ซ่อนในผ้า', date: 'July 2026', tag: 'Brand Story', excerpt: 'ทุกเส้นด้ายมีเรื่องเล่า ทุกตะเข็บมีความทรงจำ' },
    { title: 'How to Style: Jacket × Workwear', date: 'July 2026', tag: 'Styling', excerpt: 'คู่มือการแมทช์ Jacket กับเสื้อผ้า Workwear สไตล์ OLDY COSMO' },
  ]
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ padding: '80px 48px', maxWidth: '1000px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.3em', marginBottom: '16px' }}>STORIES</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '64px' }}>Blog</h1>
        <div style={{ display: 'grid', gap: '40px' }}>
          {posts.map(post => (
            <div key={post.title} style={{ borderTop: '1px solid #1a1a1a', paddingTop: '40px', display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '40px' }}>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#C9A84C', letterSpacing: '0.15em', marginBottom: '8px' }}>{post.tag}</p>
                <p style={{ color: '#444', fontSize: '0.8rem' }}>{post.date}</p>
              </div>
              <div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', marginBottom: '16px', lineHeight: '1.4' }}>{post.title}</h2>
                <p style={{ color: '#666', lineHeight: '1.7', fontSize: '0.9rem', marginBottom: '16px' }}>{post.excerpt}</p>
                <span style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.1em', cursor: 'pointer' }}>READ MORE →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
