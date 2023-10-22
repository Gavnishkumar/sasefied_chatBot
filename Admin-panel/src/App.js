// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
// import Auth from './auth/Auth';
// import { useEffect } from 'react';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <Routes />
      {/* <Auth/> */}
    </ScrollTop>
  </ThemeCustomization>
);
export default App;
