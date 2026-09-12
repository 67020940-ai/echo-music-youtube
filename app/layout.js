import './globals.css'

export const metadata = {
  title: 'EchoMusic | YouTube Intelligence',
  description: 'Personal Music Analytics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}
