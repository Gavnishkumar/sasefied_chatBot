import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, useMediaQuery,Button } from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled';

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';

import ProfileTab from './HeaderContent/Profile/ProfileTab'
// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const iconBackColor = 'grey.100';
  const iconBackColorOpen = 'grey.200';
  const navigate= useNavigate();
  // logout function
  const handleLogOut=()=>{
    localStorage.removeItem('authToken');
    navigate('/auth')
  }

  // common header
  const mainHeader = (
    <Toolbar>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:'center',width:'100%'}}>
      <IconButton
        disableRipple
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
      >
        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
      <div style={{display:'flex'}}>
      <Button variant="contained" onClick={handleLogOut}>LogOut</Button>
      <ProfileTab/>
      </div>
      </div>
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`
      // boxShadow: theme.customShadows.z1
    }
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
      
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

export default Header;
