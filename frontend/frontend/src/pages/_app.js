import ApplicationContextProvider from '../context/ApplicationContext';

export default function Home({ Component, pageProps }) {
  return <ApplicationContextProvider>
      <Component {...pageProps} />
  </ApplicationContextProvider>
}