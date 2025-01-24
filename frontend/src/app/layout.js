import { Nunito } from 'next/font/google'
import '@/app/global.css'

import { BookProvider } from "@/components/BookContext";

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
            <body className="antialiased"> <BookProvider>
          {children}
        </BookProvider></body>
        </html>
    )
}

export const metadata = {
    title: 'SMBP',
}

export default RootLayout


