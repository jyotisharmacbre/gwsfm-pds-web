import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AccountCircle, ExpandMore, HelpOutline } from '@material-ui/icons';
import Icon from '@material-ui/core/Icon';
import { spacing } from '@material-ui/system';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from './Notification';


export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      {/* <IconButton color="inherit" size="small">
        FM Cloud
      </IconButton> */}
      <IconButton color="inherit">
        <HelpOutline />
      </IconButton>
      <NotificationsIcon NotificationCount={4}/>

      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <AccountCircle style={{ marginRight: '10px' }} /> Hello, Joe Blogs <ExpandMore />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ top: '40px', left: '66px' }}
      >
        <MenuItem onClick={handleClose}>Place Holder1</MenuItem>
        <MenuItem onClick={handleClose}>Place Holder2</MenuItem>
        <MenuItem onClick={handleClose}>Sign out</MenuItem>
        <MenuItem onClick={handleClose}>Anything else</MenuItem>
      </Menu>
    </div>
  );
}

