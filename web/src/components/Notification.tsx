import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import NotificationsIconImage from '@material-ui/icons/Notifications';
import { IconButton, Badge } from '@material-ui/core';
import { display } from '@material-ui/system';
import { Block } from '@material-ui/icons';

export default function Notification(props: {NotificationCount:number, handleClick: any}){
   
        return (
           <IconButton color="inherit">
            <Badge badgeContent={props.NotificationCount} onClick={props.handleClick} > 
              <NotificationsIconImage color="secondary"  />
            </Badge>
          </IconButton>
         
          );
   
   
  }
  