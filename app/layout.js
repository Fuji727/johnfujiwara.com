import './jf.css';
import Link from "next/link";
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
// html element:  className={baskerville.className}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>John Fujiwara</h1>
          <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/resume">Résumé</Link></li>
              <li><Link href="/demos">Demos</Link></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>&copy; 2023 John Fujiwara</footer>
      </body>
    </html>
  )
}
