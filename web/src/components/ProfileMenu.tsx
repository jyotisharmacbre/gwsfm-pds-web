import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AccountCircle, ExpandMore, HelpOutline } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from './Notification';

// @ts-ignore
import authentication from "@kdpw/msal-b2c-react";

export default function ProfileMenu(props: { Name: string} ) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleNotificationClick(){
    window.location.href="/Notifications";
  }

  return (
    <div>
      {/* <IconButton color="inherit" size="small">
        FM Cloud
      </IconButton> */}
      <IconButton color="inherit">
        <HelpOutline />
      </IconButton>
      <NotificationsIcon NotificationCount={4} handleClick={handleNotificationClick}/>

      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <AccountCircle style={{ marginRight: '10px' }} /> {props.Name} <ExpandMore />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ top: '40px', left: '66px' }}
      >
        <MenuItem onClick={authentication.signOut()}>Sign out</MenuItem>
      </Menu>
    </div>
  );
}

