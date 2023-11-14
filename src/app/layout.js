import './globals.css'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import NextAuthProvider from '../auth-provider'
import GlobalState from '../context/globalState'
import ToasterContext from '@/context/toasterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Beautiful Gate App',
  description: 'Church Website and Data Management System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <GlobalState>
          <body className={inter.className}>
            <Layout>
              <ToasterContext />
              {children}</Layout>
          </body>
        </GlobalState>
      </NextAuthProvider>
    </html>
  );
}
