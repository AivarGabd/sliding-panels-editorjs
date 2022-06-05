import '../styles/globals.css'
import '../styles/Editorjs-styles.css'
import type { AppProps } from 'next/app'
import "allotment/dist/style.css";


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
