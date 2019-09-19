import React from 'react';
import NotificationsIconImage from '@material-ui/icons/Notifications';
import { IconButton, Badge } from '@material-ui/core';

export default function Notification(props: {NotificationCount:number, handleClick: any}){
   
        return (
           <IconButton color="inherit" onClick={props.handleClick}>
            <Badge badgeContent={props.NotificationCount}  > 
              <NotificationsIconImage id="BellIcon" name="BellIcon" color="secondary"  />
            </Badge>
          </IconButton>
         
          );
   
   
  }
  