import React from 'react';
import NotificationsIconImage from '@material-ui/icons/Notifications';
import { IconButton, Badge } from '@material-ui/core';

export default function Notification(props: {NotificationCount:number, handleClick: any}){
   
        return (
           <IconButton color="inherit">
            <Badge badgeContent={props.NotificationCount} onClick={props.handleClick} > 
              <NotificationsIconImage color="secondary"  />
            </Badge>
          </IconButton>
         
          );
   
   
  }
  