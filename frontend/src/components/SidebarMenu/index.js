import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { MenuItem } from '@mui/material';
import asstLogo2 from '../../assets/images/asstLogo2.svg'
import './style.scss'
import selectBar from '../../assets/images/selectBar.svg'
import { routes } from "../../Router.js"
import { history } from '../../reduxStore/store';
import { useLocation } from 'react-router-dom';


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeElement, setActiveElement] = useState("")
  const location = useLocation()

  useEffect(() => {
    setActiveElement(location.pathname)
  }, [location.pathname])

  const handleClick = (item) => {
    history.push(item.layout + item.path)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawer = (
    <div className='sidebar-section'>
      <img className='sidebar-logo' src={asstLogo2} alt="logo" onClick={() => history.push('/admin/home/')} />
      <Divider />
      <List className='list'>
        {routes.map((item, index) => (

          item.isShow === 'admin' &&
          <div className="items-section" key={index}>

            <img className={`${activeElement.slice(6, 11) === item.path || item.layout + item.path === activeElement ? 'opacity-1' : 'opacity-0'}`} src={selectBar} alt='bar' />
            <div className='main-item'>
              <MenuItem
                onClick={() => {
                  handleClick(item)
                }}
                className={`default ${activeElement.slice(6, 11) === item.path || item.layout + item.path === activeElement ? props.className : null}`}
              >
                <img className='items-icon' src={item.icon} alt='icon' />
                <span>{item.name}</span>
              </MenuItem>
            </div>
          </div>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}

          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;