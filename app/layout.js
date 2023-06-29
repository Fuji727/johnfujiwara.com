import './jf.css';

export const metadata = {
  title: 'John Fujiwara',
  description: 'John Fujiwara',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
