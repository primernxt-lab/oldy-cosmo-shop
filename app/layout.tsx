import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OLDY COSMO — Old Soul. Cosmic Journey.',
  description: 'Vintage Americana × Military Heritage × Japanese Workwear | Bangkok',
}

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT US' },
  { href: '/blog', label: 'BLOG' },
  { href: '/contact', label: 'CONTACT' },
  { href: '/shop', label: 'SHOP' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Barlow:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: '#0A0A0A', color: '#F0EDE8', fontFamily: 'Barlow, sans-serif' }}>
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(10,10,10,0.96)', borderBottom: '1px solid #1a1a1a', padding: '0 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          <a href="/" style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C', fontSize: '1.1rem', letterSpacing: '0.25em', textDecoration: 'none', fontWeight: '700' }}>
            OLDY COSMO
          </a>
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            {navLinks.map(link => (
              <a key={link.href} href={link.href} style={{ color: '#F0EDE8', textDecoration: 'none', fontSize: '0.72rem', letterSpacing: '0.15em' }}>
                {link.label}
              </a>
            ))}
            <a href="/cart" style={{ padding: '7px 18px', border: '1px solid #C9A84C', color: '#C9A84C', textDecoration: 'none', fontSize: '0.72rem', letterSpacing: '0.15em' }}>
              CART
            </a>
          </div>
        </nav>
        {children}
        <footer style={{ background: '#0A0A0A', borderTop: '1px solid #1a1a1a', padding: '60px 48px 40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '48px' }}>
            <div>
              <p style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C', fontSize: '1.2rem', letterSpacing: '0.2em', marginBottom: '16px' }}>OLDY COSMO</p>
              <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: '1.7' }}>Old Soul. Cosmic Journey.<br />Vintage Americana × Military Heritage<br />Bangkok, Thailand</p>
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', color: '#C9A84C', letterSpacing: '0.15em', marginBottom: '16px' }}>MENU</p>
              {navLinks.map(link => (
                <a key={link.href} href={link.href} style={{ display: 'block', color: '#555', textDecoration: 'none', fontSize: '0.8rem', marginBottom: '8px', letterSpacing: '0.1em' }}>{link.label}</a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', color: '#C9A84C', letterSpacing: '0.15em', marginBottom: '16px' }}>CONTACT</p>
              <p style={{ color: '#555', fontSize: '0.8rem', lineHeight: '2' }}>LINE: @oldycosmo<br />Email: hello@oldycosmo.com<br />Bangkok, Thailand</p>
            </div>
          </div>
          <div style={{ maxWidth: '1200px', margin: '40px auto 0', borderTop: '1px solid #1a1a1a', paddingTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ color: '#333', fontSize: '0.75rem' }}>© 2026 OLDY COSMO. All rights reserved.</p>
            <p style={{ color: '#333', fontSize: '0.75rem' }}>PRIMER GROUP CO., LTD.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
