import '../styles/globals.css'
import { UserContext } from '../lib/auth/context'
import { useUserData } from '../lib/auth/hooks'
import { MantineProvider } from '@mantine/core';
import Head from 'next/head'
import { MyNavbar } from '../components/UI/MyNavbar';
import { AppShell, Navbar, Header } from '@mantine/core';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <>
      <Head>
        <title>BMX</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <UserContext.Provider value={userData}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
          }}
        >
          <AppShell
            padding="md"
            navbar={<MyNavbar userData={userData}/>}
            styles={(theme) => ({
              main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
          >
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </UserContext.Provider>
    </>
  )
}

export default MyApp
