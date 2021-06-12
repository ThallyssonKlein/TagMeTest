import ApplicationContextProvider from '../context/ApplicationContext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

export default function Home({ Component, pageProps }) {
  const theme = createMuiTheme({
     palette : {
        primary : {
          main : orange[500]
        }
     }
  });
  
  return <ThemeProvider theme={theme}>
            <ApplicationContextProvider>
                <Component {...pageProps} />
            </ApplicationContextProvider>
         </ThemeProvider>
}