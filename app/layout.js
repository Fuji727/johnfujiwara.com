import './jf.css';
import Link from "next/link";
// Google Fonts import - temporarily commented for testing due to network connectivity
// import { Baskervville } from 'next/font/google'
// 
// const baskerville = Baskervville({
//   subsets: ['latin'],
//   display: 'swap',
//   weight: '400',
//   fallback: ['Georgia', 'serif'],
// })
export const metadata = {
  title: 'John Fujiwara',
  description: 'John Fujiwara',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1><Link href="/">John Fujiwara</Link></h1>
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