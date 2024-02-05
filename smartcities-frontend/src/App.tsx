import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { appRoutes } from './routes';

function App() {
  localStorage.setItem('accessToken', 'NONE');
  localStorage.setItem('idToken', 'NONE');

  const theme = createTheme({
    palette: {
      secondary: {
        light: '#393E46',
        main: '#222831',
        dark: 'black',
        contrastText: 'white',
      },
      primary: {
        main: '#FFD369',
        light: '#EEEEEE',
        dark: '#EEEEEE',
        contrastText: '#000',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh" display="flex" flexDirection="column">
        <Router>
          <Navbar />
          <Routes>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
          <Footer />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
