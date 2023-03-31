import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://kit.fontawesome.com/d48aa7277c.css" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@1,900&family=Montserrat:ital,wght@1,100;1,200;1,400;1,500&family=Roboto:ital,wght@0,100;0,400;0,500;1,100;1,400;1,500&family=Rubik&display=swap" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/d48aa7277c.js" crossOrigin="anonymous"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
