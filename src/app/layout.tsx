import type {Metadata} from 'next';

import userGet from '@/actions/user-get';
import Footer from '@/components/footer';
import Header from '@/components/header';
import {UserContextProvider} from '@/context/user-context';
import {typeSecond} from '@/functions/fonts';

import {ReactNode} from 'react';
import {Toaster} from 'sonner';

import './globals.css';

export const metadata: Metadata = {
  title: 'Dogs Next',
  description: 'Rede social para cachorros',
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  const {data: user} = await userGet();

  return (
    <html lang="pt-br">
      <body className={typeSecond.variable}>
        <UserContextProvider user={user}>
          <div className="App">
            <Header />
            <main className="AppBody">{children}</main>
            <Footer />
            <Toaster richColors expand position="top-right" />
            <div>{modal}</div>
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
