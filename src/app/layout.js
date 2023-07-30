import './globals.css'

export const metadata = {
  title: 'Open Seattle',
  description: 'Toy app for show casing web dev abilities',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
