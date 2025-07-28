import { Inter } from "next/font/google";
import "../terms.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          content="text/html; charset=UTF-8"
          http-equiv="content-type"></meta>
      </Head>
      <body
        className={`${inter.className} c4 doc-content`}
        suppressHydrationWarning={true}>
        <main>{children}</main>
      </body>
    </html>
  );
}
