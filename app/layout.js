import './jf.css';
import { Baskervville } from 'next/font/google'
 
const baskerville = Baskervville({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})
export const metadata = {
  title: 'John Fujiwara',
  description: 'John Fujiwara',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={baskerville.className}>
      <body>{children}</body>
    </html>
  )
}
