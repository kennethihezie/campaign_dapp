/* Components */
import { Providers } from '@/lib/providers'

/* Instruments */
import styles from './styles/layout.module.css'
import './styles/globals.css'
import NavBar from './components/navbar/navbar'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
            <NavBar />
            { props.children }
        </body>
      </html>
    </Providers>
  )
}
